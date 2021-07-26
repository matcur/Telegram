using Microsoft.AspNetCore.Http;

namespace Telegram.Server.Core.Extensions
{
    public static class HttpRequestExtension
    {
        public static string IndexUrl(this HttpRequest request)
        {
            return request.Scheme + "://" + request.Host.Value + @"/";
        }
    }
}