using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Extensions;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Exceptions;
using Telegram.Server.Core.Extensions;

namespace Telegram.Server.Core.Services.Controllers
{
    public class ChatService
    {
        private readonly UserService _users;

        private readonly AppDb _db;

        private readonly DbSet<Chat> _chats;
        
        private readonly DbSet<Message> _messages;
        
        private readonly DbSet<LastReadMessage> _lastReadMessages;

        public ChatService(UserService users, AppDb db)
        {
            _users = users;
            _db = db;
            _chats = db.Chats;
            _messages = db.Messages;
            _lastReadMessages = db.LastReadMessages;
        }

        public async Task<Chat> Get(int id)
        {
            var chat = await _chats.FirstOrDefaultAsync(c => c.Id == id);
            if (chat == null)
            {
                throw new NotFoundException($"Chat with id = {id} not found.");
            }

            return chat;
        }

        public async Task<Chat> Add(Chat chat)
        {
            await _chats.AddAsync(chat);
            await _db.SaveChangesAsync();

            return await _chats
                .DetailChats()
                .FirstAsync(c => c.Id == chat.Id);
        }

        public async Task AddMembers(int chatId, List<int> memberIds)
        {
            var members = await _users.Enumerable(memberIds);
            var chat = await Get(chatId);
            var lastMessage = await _messages.LastMessage(chatId);

            chat.LastReadMessages.AddRange(
                members.Select(m => new LastReadMessage(m, chat, lastMessage))
            );
            chat.Members.AddRange(members.Select(m => new ChatUser {UserId = m.Id}));
            await _db.SaveChangesAsync();
        }

        public Task<bool> Exists(int id)
        {
            return _chats.AnyAsync(c => c.Id == id);
        }

        public Task<List<UserChat>> WithMember(int userId, Pagination pagination)
        {
            var query = _chats
                .Include(c => c.Members)
                .ThenInclude(c => c.User)
                .Include(c => c.Messages)
                .ThenInclude(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Include(c => c.LastReadMessages)
                .Select(c => new UserChat
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    LastMessage = c.Messages.Where(m => m.Type == MessageType.UserMessage)
                        .OrderByDescending(m => m.Id)
                        .FirstOrDefault(),
                    IconUrl = c.IconUrl,
                    Members = c.Members,
                    UpdatedDate = c.UpdatedDate,
                    CreatorId = c.CreatorId,
                    LastReadMessageId = c.LastReadMessages.FirstOrDefault(m => m.UserId == userId).MessageId,
                })
                .Where(c => c.Members.Any(m => m.UserId == userId) || c.CreatorId == userId)
                .Skip(pagination.Offset());
            if (pagination.Count() != -1)
            {
                query = query.Take(pagination.Count());
            }

            return query
                .OrderByDescending(c => c.UpdatedDate)
                .ToListAsync();
        }

        public Task<List<int>> WithMemberLoadIds(int userId)
        {
            return _chats
                .Where(c => c.Members.Any(m => m.UserId == userId))
                .Select(c => c.Id)
                .ToListAsync();
        }

        public Task Update(int id)
        {
            return _db.Database.ExecuteSqlRawAsync(
                $"update \"Chats\" set \"UpdatedDate\" = '{DateTime.Now.ToString("yyyy-MM-dd h:mm:ss.fff")}' " +
                $"where \"Id\" = {id};"
            );
        }

        public async Task ChangeLastReadMessage(int chatId, int messageId, int userId)
        {
            await EnsureMessageExistsIn(chatId, messageId);
            var lastReadMessage = new LastReadMessage{ChatId = chatId, MessageId = messageId, UserId = userId};
            _lastReadMessages.Attach(lastReadMessage);
            await _db.SaveChangesAsync();
        }

        private async Task EnsureMessageExistsIn(int chatId, int messageId)
        {
            if (!await _chats.AnyAsync(
                c => c.Id == chatId
                     && c.Messages.Any(m => m.Id == messageId)))
            {
                throw new NotFoundException($"MessageId {messageId} is not found in chat {chatId}");
            }
        }

        private async Task EnsureChatExists(int chatId)
        {
            if (!await _chats.AnyAsync(c => c.Id == chatId))
            {
                throw new NotFoundException($"Chat with id = {chatId} not found.");
            }
        }
    }

    public class UserChat : Chat
    {
        public Chat Chat { get; set; }

        public int? LastReadMessageId { get; set; }

        public int UnreadMessageCount { get; set; }
    }
}