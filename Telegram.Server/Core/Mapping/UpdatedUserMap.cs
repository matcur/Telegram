using Newtonsoft.Json;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class UpdatedUserMap
    {
        public int Id { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string FirstName { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string LastName { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Bio { get; set; }

        public UpdatedUserMap() {}

        public UpdatedUserMap(User user)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Bio = user.Bio;
        }
    }
}