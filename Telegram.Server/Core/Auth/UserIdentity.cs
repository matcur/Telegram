using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Auth.Security;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Auth
{
    public class UserIdentity
    {
        private readonly ISecurityToken securityToken;
        
        private readonly DbSet<User> users;
        
        private readonly DbSet<Code> codes;
        
        private readonly DbSet<Phone> phones;

        public UserIdentity(AppDb db, ISecurityToken securityToken)
        {
            this.securityToken = securityToken;
            users = db.Users;
            codes = db.Codes;
            phones = db.Phones;
        }

        public bool IsValid(string code, int userId)
        {
            return codes.Any(
                c => code == c.Value &&
                     c.UserId == userId &&
                     !c.Entered
            );
        }

        public string Token(int userId)
        {
            if (users.Any(u => u.Id == userId))
            {
                return securityToken.ToString(Claims(userId));
            }

            throw new Exception($"User with id = {userId} not found");
        }

        public ClaimsIdentity Claims(int userId)
        {
            var phone = phones.First(u => u.OwnerId == userId);

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, phone.Number),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "SimpleUser")
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