using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Telegram.Server.Core.Auth.Security
{
    public interface IAuthorizationToken
    {
        SecurityToken From(ClaimsIdentity claimsIdentity);
    }
}