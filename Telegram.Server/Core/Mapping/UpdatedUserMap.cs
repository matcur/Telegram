using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class UpdatedUserMap
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

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