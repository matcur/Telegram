using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Telegram.Server.Core.Exceptions;
using Telegram.Server.Core.ResponseBodies;

namespace Telegram.Server.Core.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        
        private readonly IWebHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, IWebHostEnvironment env)
        {
            _next = next;
            _env = env;
        }
        
        public async Task Invoke(HttpContext context)
        {
            var response = context.Response;
            try
            {
                await _next(context);
            }
            catch (NotFoundException e)
            {
                response.StatusCode = 404;
                await response.WriteAsync(await new JsonBody(e).AsString());
            }
            catch (Exception e)
            {
                response.ContentType = "application/json";
                response.StatusCode = 500;
                var body = await new JsonBody(e).AsString();
                if (_env.IsDevelopment())
                {
                    body += $" {e.StackTrace}";
                }            
                await response.WriteAsync(body);
            }
        }
    }
}