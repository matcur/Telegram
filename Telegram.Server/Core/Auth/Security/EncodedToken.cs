using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Telegram.Server.Core.Auth.Security
{
    public class EncodedToken : ISecurityToken
    {
        private readonly ISecurityToken securityToken;
        
        private readonly SecurityTokenHandler tokenHandler;

        public EncodedToken(ISecurityToken securityToken, SecurityTokenHandler tokenHandler)
        {
            this.securityToken = securityToken;
            this.tokenHandler = tokenHandler;
        }
        
        public SecurityToken From(ClaimsIdentity claimsIdentity)
        {
            return securityToken.From(claimsIdentity);
        }

        public string ToString(ClaimsIdentity claimsIdentity)
        {
            return tokenHandler.WriteToken(
                From(claimsIdentity)
            );
        }
    }
}