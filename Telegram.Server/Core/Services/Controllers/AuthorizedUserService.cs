using System.Collections.Generic;
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

        private readonly UserService _userService;
        
        private readonly AuthorizedUser _authorizedUser;

        public AuthorizedUserService(AppDb db, AuthorizedUser authorizedUser, UserService userService)
        {
            _db = db;
            _users = db.Users;
            _authorizedUser = authorizedUser;
            _userService = userService;
        }

        public User Get()
        {
            return _users.Find(_authorizedUser.Id());
        }

        public IEnumerable<Chat> Chats(Pagination pagination)
        {
            return _userService.Chats(_authorizedUser.Id(), pagination);
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
    }
}