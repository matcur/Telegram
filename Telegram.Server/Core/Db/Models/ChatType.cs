using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Telegram.Server.Core.Db.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum ChatType
    {
        [EnumMember(Value = nameof(WithBot))]
        WithBot,
        [EnumMember(Value = nameof(Conversation))]
        Conversation,
        [EnumMember(Value = nameof(PersonalCorrespondence))]
        PersonalCorrespondence,
    }
}