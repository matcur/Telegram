using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Telegram.Server.Core.Auth
{
    public class AuthorizedUser
    {
        private readonly HttpContext _httpContext;

        public AuthorizedUser(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext.HttpContext;
        }

        public int Id()
        {
            var identityName = _httpContext.User.Identity.Name;
            if (string.IsNullOrEmpty(identityName))
            {
                throw new Exception("User unauthorized.");
            }

            if (!int.TryParse(identityName, out var result))
            {
                throw new Exception($"User id must be int, {identityName} was given");
            }

            return result;
        }
    }
}