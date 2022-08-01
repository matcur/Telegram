using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Exceptions;

namespace Telegram.Server.Core.Services.Controllers
{
    public class ChatService
    {
        private readonly UserService _users;

        private readonly AppDb _db;

        private readonly DbSet<Chat> _chats;

        public ChatService(UserService users, AppDb db)
        {
            _users = users;
            _db = db;
            _chats = db.Chats;
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

            return chat;
        }

        public async Task AddMembers(int chatId, List<int> memberIds)
        {
            var members = await _users.Enumerable(memberIds);
            var chat = await Get(chatId);

            chat.Members.AddRange(members.Select(m => new ChatUser {UserId = m.Id}));
            await _db.SaveChangesAsync();
        }

        public Task<bool> Exists(int id)
        {
            return _chats.AnyAsync(c => c.Id == id);
        }

        public Task<List<Chat>> WithMember(int userId, Pagination pagination)
        {
            var query = _chats
                .Include(c => c.Members)
                .ThenInclude(c => c.User)
                .Include(c => c.Messages)
                .ThenInclude(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Select(c => new Chat
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
                })
                .Where(c => c.Members.Any(m => m.UserId == userId))
                .Where(c => c.CreatorId == userId)
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

        private async Task EnsureChatExists(int chatId)
        {
            if (await _chats.AnyAsync(c => c.Id == chatId))
            {
                throw new NotFoundException($"Chat with id = {chatId} not found.");
            }
        }
    }
}