using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Telegram.Server.Core.Auth.Security
{
    public class TelegramToken : ISecurityToken
    {
        private readonly string issuer;
        
        private readonly string audience;

        private readonly TimeSpan expires;

        public TelegramToken(string issuer, string audience, int minutes)
            : this(issuer, audience, TimeSpan.FromMinutes(minutes))
        {
        }

        public TelegramToken(string issuer, string audience, TimeSpan expires)
        {
            this.issuer = issuer;
            this.audience = audience;
            this.expires = expires;
        }

        public SecurityToken From(ClaimsIdentity claimsIdentity)
        {
            var now = DateTime.Now;

            return new JwtSecurityToken(
                issuer,
                audience,
                claimsIdentity.Claims,
                now,
                now.Add(expires),
                new SigningCredentials(
                    AuthorizationOptions.SecurityKey, SecurityAlgorithms.HmacSha256
                )
            );
        }

        public string ToString(ClaimsIdentity claimsIdentity)
        {
            return From(claimsIdentity).ToString();
        }
    }
}