using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Telegram.Server.Core.Auth.Security
{
    public class EncodedToken : ISecurityToken
    {
        private readonly ISecurityToken _securityToken;
        
        private readonly SecurityTokenHandler _tokenHandler;

        public EncodedToken(ISecurityToken securityToken, SecurityTokenHandler tokenHandler)
        {
            _securityToken = securityToken;
            _tokenHandler = tokenHandler;
        }
        
        public SecurityToken From(ClaimsIdentity claimsIdentity)
        {
            return _securityToken.From(claimsIdentity);
        }

        public string ToString(ClaimsIdentity claimsIdentity)
        {
            return _tokenHandler.WriteToken(
                From(claimsIdentity)
            );
        }
    }
}