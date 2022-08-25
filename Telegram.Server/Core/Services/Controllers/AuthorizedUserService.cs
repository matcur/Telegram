using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Exceptions;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Services.Controllers
{
    [Authorize]
    public class AuthorizedUserService
    {
        private readonly AppDb _db;

        private readonly DbSet<User> _users;

        private readonly ChatService _chatService;

        private readonly DbSet<Message> _messages;

        private readonly AuthorizedUser _authorizedUser;

        public AuthorizedUserService(AppDb db, AuthorizedUser authorizedUser, ChatService chatService)
        {
            _db = db;
            _users = db.Users;
            _messages = db.Messages;
            _authorizedUser = authorizedUser;
            _chatService = chatService;
        }

        public Task<User> Get()
        {
            return _users.FirstAsync(u => u.Id == _authorizedUser.Id());
        }

        public Task<List<Chat>> Chats(Pagination pagination)
        {
            return _chatService.WithMember(_authorizedUser.Id(), pagination);
        }

        public Task<Chat> Chat(int id)
        {
            return _chatService.Get(id);
        }

        public Task<List<int>> ChatIds()
        {
            return _chatService.WithMemberLoadIds(_authorizedUser.Id());
        }

        public void ChangeAvatar(string avatarUrl)
        {
            var user = new User
            {
                Id = _authorizedUser.Id(),
                AvatarUrl = avatarUrl
            };
            _db.Entry(user).State = EntityState.Modified;
            _db.SaveChanges();
        }

        public Task<bool> MemberOf(int chatId)
        {
            return _users
                .Where(u => u.Id == _authorizedUser.Id())
                .AnyAsync(u => u.Chats.Any(c => c.ChatId == chatId));
        }

        public Task<bool> CreatorOf(int chatId)
        {
            return _users
                .AnyAsync(u => 
                    u.Chats.Any(c => c.Chat.CreatorId == _authorizedUser.Id()));
        }

        public Task<bool> CanUpdateMessage(int id)
        {
            return IsMessageAuthor(id);
        }

        public Task<bool> IsMessageAuthor(int id)
        {
            return _messages
                .Where(m => m.Id == id && m.AuthorId == _authorizedUser.Id())
                .AnyAsync();
        }

        public Task<List<User>> Contacts()
        {
            return _users
                .Where(u => u.Id != _authorizedUser.Id())
                .ToListAsync();
        }

        public async Task EnsureMemberOf(int chatId)
        {
            if (!await MemberOf(chatId))
            {
                throw new PermissionDenyException($"You are not member of chat.");
            }
        }

        public async Task<Chat> AddGroup(ChatMap map)
        {
            var chat = new Chat(map);
            chat.Creator = await Get();
            chat.Type = ChatType.Group;
            
            return await _chatService.Add(chat);
        }

        public void Update(User user)
        {
            user.Id = _authorizedUser.Id();
            _db.Entry(user).State = EntityState.Modified;
            _db.SaveChanges();
        }
    }
}