using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Auth
{
    public class AuthorizedUser
    {
        private readonly HttpContext _httpContext;

        private readonly DbSet<User> _users;

        public AuthorizedUser(IHttpContextAccessor httpContext, AppDb db)
        {
            _httpContext = httpContext.HttpContext;
            _users = db.Users;
        }

        public int Id()
        {
            var identityName = _httpContext.User.Identity.Name;
            if (string.IsNullOrEmpty(identityName))
            {
                throw new Exception("User unauthorized.");
            }

            if (!int.TryParse(identityName, out var result))
            {
                throw new Exception($"User id must be int, {identityName} was given");
            }

            return result;
        }

        public bool MemberOf(int chatId)
        {
            return _users
                .Where(u => u.Id == Id())
                .Any(u => u.Chats.Any(c => c.ChatId == chatId));
        }
    }
}