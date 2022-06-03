using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Telegram.Server.Core.Exceptions;

namespace Telegram.Server.Core.ResponseBodies
{
    public class JsonBody
    {
        public string Message { get; }
        
        public JsonBody(Exception exception) : this(exception.Message) { }

        public JsonBody(string message)
        {
            Message = message;
        }

        public Task<string> AsString()
        {
            var content = new StringContent(JsonConvert.SerializeObject(this, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
            }));
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            
            return content.ReadAsStringAsync();
        }
    }
}