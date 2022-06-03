using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
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
        
        private readonly MessageAdded _messageAdded;

        private readonly DbSet<Message> _messages;
        
        private readonly DbSet<Content> _contents;

        public MessageService(AppDb db, ChatService chats, AuthorizedUserService authorizedUser, MessageAdded messageAdded)
        {
            _db = db;
            _chats = chats;
            _authorizedUser = authorizedUser;
            _messageAdded = messageAdded;
            _messages = db.Messages;
            _contents = db.Contents;
        }

        public async Task<IEnumerable<Message>> Filtered(int chaiId, int offset, int count)
        {
            var result = await Details(chaiId)
                .Skip(offset)
                .Take(count)
                .ToListAsync();
            result.Reverse();

            return result;
        }

        public async Task<Message> Add(MessageMap map)
        {
            // extract to something
            if (!_chats.Exists(map.ChatId))
            {
                throw new NotFoundException($"Chat with id {map.ChatId} not found.");
            }

            // too
            if (!await _authorizedUser.MemberOf(map.ChatId))
            {
                throw new PermissionDenyException($"You are not member of chat {map.ChatId}");
            }

            var message = new Message(map);
            message.Author = await _authorizedUser.Get();
            await _messages.AddAsync(message);
            await _db.SaveChangesAsync();
            _messageAdded.Emit(message);

            return message;
        }

        public async Task<Message> Update(UpdateMessageMap map)
        {
            var message = await _messages
                .Include(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Include(m => m.Author)
                .FirstOrDefaultAsync(m => m.Id == map.Id);
            if (message == null)
            {
                throw new NotFoundException($"Message with id = {map.Id} doesn't exist");
            }

            _contents.RemoveRange(message.ContentMessages.Select(c => c.Content));
            message.ContentMessages.AddRange(map.ContentMessages);

            await _db.SaveChangesAsync();

            return message;
        }
        
        private IQueryable<Message> Details(int id)
        {
            return _messages.Where(m => m.ChatId == id)
                .Include(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Include(m => m.Author)
                .OrderByDescending(m => m.Id);
        }
    }
}