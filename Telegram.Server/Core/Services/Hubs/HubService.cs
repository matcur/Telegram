using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Telegram.Server.Core.Services.Hubs
{
    public abstract class HubService
    {
        protected string Serialize(object value)
        {
            return JsonConvert.SerializeObject(value, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
            });
        }
    }
}