using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.DesignData
{
    public class DesignUser
    {
        public static DesignUser User = new DesignUser();

        public int Id { get; set; } = 100;

        public string FirstName { get; set; } = "Loririumupsium";

        public string LastName { get; set; } = "Loremupsum";

        public string FullName => $"{FirstName} {LastName}";

        public Phone Phone { get; set; } = new Phone { Number = "88005553535", OwnerId = 100 };
    }
}
