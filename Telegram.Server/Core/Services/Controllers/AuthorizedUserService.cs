using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

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
            return _users.Take(10).ToListAsync();
        }
    }
}