using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Telegram.Server.Core.Auth.Security
{
    public interface ISecurityToken
    {
        SecurityToken From(ClaimsIdentity claimsIdentity);

        string ToString(ClaimsIdentity claimsIdentity);
    }
}