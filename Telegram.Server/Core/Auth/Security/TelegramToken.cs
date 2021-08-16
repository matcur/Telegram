using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Telegram.Server.Core.Auth.Security
{
    public class TelegramToken : ISecurityToken
    {
        private readonly string _issuer;
        
        private readonly string _audience;

        private readonly TimeSpan _expires;

        public TelegramToken(string issuer, string audience, int minutes)
            : this(issuer, audience, TimeSpan.FromMinutes(minutes))
        {
        }

        public TelegramToken(string issuer, string audience, TimeSpan expires)
        {
            _issuer = issuer;
            _audience = audience;
            _expires = expires;
        }

        public SecurityToken From(ClaimsIdentity claimsIdentity)
        {
            var now = DateTime.Now;

            return new JwtSecurityToken(
                _issuer,
                _audience,
                claimsIdentity.Claims,
                now,
                now.Add(_expires),
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