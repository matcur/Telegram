using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Telegram.Server.Core.Auth.Security;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Auth
{
    public class UserIdentity
    {
        private readonly IAuthorizationToken _authorizationToken;
        
        private readonly SecurityTokenHandler _tokenHandler;

        private readonly DbSet<User> _users;
        
        private readonly DbSet<Code> _codes;
        
        private readonly AppDb _db;

        public UserIdentity(AppDb db, IAuthorizationToken authorizationToken, SecurityTokenHandler tokenHandler)
        {
            _db = db;
            _authorizationToken = authorizationToken;
            _tokenHandler = tokenHandler;
            _users = db.Users;
            _codes = db.Codes;
        }

        public bool ValidCode(string code, int userId)
        {
            return _codes.Any(
                c => code == c.Value &&
                     c.UserId == userId
            );
        }

        public string CreateToken(int userId, string role)
        {
            if (_users.Any(u => u.Id == userId))
            {
                var token = _authorizationToken.From(Claims(userId, role));

                return _tokenHandler.WriteToken(token);
            }

            throw new Exception($"User with id = {userId} not found");
        }

        public async Task ForgotCode(string value, int userId)
        {
            var code = await _codes.FirstOrDefaultAsync(
                c => c.Value == value && c.UserId == userId
            );
            if (code == null)
            {
                return;
            }

            _codes.Remove(code);
            await _db.SaveChangesAsync();
        }

        private ClaimsIdentity Claims(int userId, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userId.ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, role)
            };
            
            return new ClaimsIdentity(
                claims,
                "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType
            );
        }
    }
}