using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        
        private readonly DbSet<Phone> _phones;

        public UserIdentity(AppDb db, IAuthorizationToken authorizationToken, SecurityTokenHandler tokenHandler)
        {
            _authorizationToken = authorizationToken;
            _tokenHandler = tokenHandler;
            _users = db.Users;
            _codes = db.Codes;
            _phones = db.Phones;
        }

        public bool ValidCode(string code, int userId)
        {
            return _codes.Any(
                c => code == c.Value &&
                     c.UserId == userId &&
                     !c.Entered
            );
        }

        public string CreateToken(int userId)
        {
            if (_users.Any(u => u.Id == userId))
            {
                var token = _authorizationToken.From(Claims(userId));

                return _tokenHandler.WriteToken(token);
            }

            throw new Exception($"User with id = {userId} not found");
        }

        private ClaimsIdentity Claims(int userId)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userId.ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "simpleUser")
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