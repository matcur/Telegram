using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Telegram.Server.Core
{
    public static class JsonTelegram
    {
        private static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
        };
        
        public static string Serialize(object value)
        {
            return JsonConvert.SerializeObject(value, Settings);
        }
    }
}