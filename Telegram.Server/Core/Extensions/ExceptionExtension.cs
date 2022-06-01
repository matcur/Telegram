using Microsoft.AspNetCore.Builder;
using Telegram.Server.Core.Middlewares;

namespace Telegram.Server.Core.Extensions
{
    public static class ExceptionExtension
    {
        public static IApplicationBuilder UseException(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}