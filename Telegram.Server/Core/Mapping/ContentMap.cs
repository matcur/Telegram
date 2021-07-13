using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class ContentMap
    {
        public string Value { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public ContentType Type { get; set; }
    }
}