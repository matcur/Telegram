using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class RegisteredUser
    {
        public int Id { get; }

        public string FirstName { get; }

        public string LastName { get; }

        public PhoneMap Phone { get; }

        public RegisteredUser(User user)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Phone = new PhoneMap(user.Phone);
        }
    }
}
