using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Telegram.Server.Core.Db.Models
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public List<Message> Messages { get; set; } = new List<Message>();

        public List<User> Members { get; set; } = new List<User>();
    }
}