using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Telegram.Api.Resources
{
    public abstract class ApiResource
    {
        public HttpContent Serialize(object data)
        {
            return JsonContent.Create(data);
        }

        public T Deserialize<T>(string content)
        {
            var settings = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };

            return JsonSerializer.Deserialize<T>(content, settings);
        }
    }
}
