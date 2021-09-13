using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace Telegram.Server.Core.Db.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum ContentType
    {
        [EnumMember(Value = "Text")]
        Text,
        [EnumMember(Value = "Image")]
        Image,
    }
}
