using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Extensions;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Exceptions;
using Telegram.Server.Core.Mapping;
using Telegram.Server.Core.Notifications;

namespace Telegram.Server.Core.Services.Controllers
{
    public class MessageService
    {
        private readonly AppDb _db;
        
        private readonly ChatService _chats;
        
        private readonly AuthorizedUserService _authorizedUser;
        
        private readonly ChatEvents _chatEvents;

        private readonly DbSet<Message> _messages;
        
        private readonly DbSet<Content> _contents;

        public MessageService(AppDb db, ChatService chats, AuthorizedUserService authorizedUser, ChatEvents chatEvents)
        {
            _db = db;
            _chats = chats;
            _authorizedUser = authorizedUser;
            _chatEvents = chatEvents;
            _messages = db.Messages;
            _contents = db.Contents;
        }

        public async Task<Message> Get(int id)
        {
            var message = await _messages
                .Include(m => m.Author)
                .Include(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (message == null)
            {
                throw new NotFoundException($"Message with id {id} is not found");
            }

            return message;
        }

        public async Task<IEnumerable<Message>> Filtered(int chaiId, Pagination pagination)
        {
            var result = await _messages.Details(chaiId)
                .Skip(pagination.Offset())
                .Take(pagination.Count())
                .Filtered(pagination)
                .ToListAsync();

            result.Reverse();

            return result;
        }

        public async Task<Message> AddNewUsersMessage(int chatId, IEnumerable<int> newMemberIds)
        {
            var map = new Message
            {
                ChatId = chatId,
                Type = MessageType.NewUserAdded,
                AssociatedUsers = newMemberIds.Select(id => new UserMessage{UserId = id}).ToList()
            };
            return await Add(map, await _authorizedUser.Get());
        }

        public Task<Message> Add(MessageMap map, User author)
        {
            return Add(new Message(map), author);
        }

        public async Task<Message> Add(Message message, User author)
        {
            // extract to something
            if (!await _chats.Exists(message.ChatId))
            {
                throw new NotFoundException($"Chat with id {message.ChatId} not found.");
            }

            // too
            if (!await _authorizedUser.MemberOf(message.ChatId))
            {
                throw new PermissionDenyException($"You are not member of chat {message.ChatId}");
            }

            message.Author = author;
            message.AuthorId = message.Author.Id;
            if (message.ReplyToId.HasValue)
            {
                message.ReplyToId = message.ReplyToId;
                message.ReplyTo = await Get(message.ReplyToId.Value);
            }
            await _messages.AddAsync(message);
            await _db.SaveChangesAsync();
            
            await _chatEvents.OnMessageAdded(message);

            return message;
        }

        public async Task<Message> Update(UpdateMessageMap map)
        {
            if (!await _authorizedUser.CanUpdateMessage(map.Id))
            {
                throw new PermissionDenyException($"You can't update message[id = {map.Id}].");
            }
            
            var message = await _messages
                .Include(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Include(m => m.Author)
                .FirstOrDefaultAsync(m => m.Id == map.Id);

            _contents.RemoveRange(message.ContentMessages.Select(c => c.Content));
            message.ContentMessages.AddRange(map.ContentMessages);
            message.Edited = true;

            await _db.SaveChangesAsync();
            await _chatEvents.OnMessageUpdated(message);

            return message;
        }
    }
}