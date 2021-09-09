using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Telegram.Server.Core.Auth.Security
{
    public class EncodedToken : IAuthorizationToken
    {
        private readonly IAuthorizationToken _authorizationToken;
        
        private readonly SecurityTokenHandler _tokenHandler;

        public EncodedToken(IAuthorizationToken authorizationToken, SecurityTokenHandler tokenHandler)
        {
            _authorizationToken = authorizationToken;
            _tokenHandler = tokenHandler;
        }
        
        public SecurityToken From(ClaimsIdentity claimsIdentity)
        {
            return _authorizationToken.From(claimsIdentity);
        }

        public string ToString(ClaimsIdentity claimsIdentity)
        {
            return _tokenHandler.WriteToken(
                From(claimsIdentity)
            );
        }
    }
}