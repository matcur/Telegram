using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Telegram.Server.Core.Exceptions;
using Telegram.Server.Core.ResponseBodies;

namespace Telegram.Server.Core.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (NotFoundException e)
            {
                var response = context.Response;;
                response.StatusCode = 404;
                await response.WriteAsync(await new NotFoundBody(e).AsString());
            }
        }
    }
}