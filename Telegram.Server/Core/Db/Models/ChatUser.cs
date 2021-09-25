using System.ComponentModel.DataAnnotations.Schema;

namespace Telegram.Server.Core.Db.Models
{
    public class ChatUser
    {
        public int UserId { get; set; }

        public int ChatId { get; set; }
        
        public User User { get; set; }

        public Chat Chat { get; set; }

        public ChatUser()
        {
        }

        public ChatUser(int userId)
        {
            UserId = userId;
        }
    }
}