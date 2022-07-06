using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Telegram.Server.Core.Db.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum MessageType
    {
        [EnumMember(Value = "UserMessage")]
        UserMessage,
        [EnumMember(Value = "NewUserAdded")]
        NewUserAdded,
    }
}