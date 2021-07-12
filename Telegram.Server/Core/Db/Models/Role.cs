using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Telegram.Server.Core.Db.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public List<User> Users { get; set; } = new List<User>();

        public List<Chat> Chats { get; set; } = new List<Chat>();
    }
}