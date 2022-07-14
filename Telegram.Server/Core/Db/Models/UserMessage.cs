namespace Telegram.Server.Core.Db.Models
{
    public class UserMessage
    {
        public int UserId { get; set; }

        public int MessageId { get; set; }

        public User User { get; set; }

        public Message Message { get; set; }
    }
}