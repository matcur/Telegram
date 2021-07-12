using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        [NotMapped]
        public Message LastMessage { get; set; }

        public List<Message> Messages { get; set; } = new List<Message>();

        public List<User> Members { get; set; } = new List<User>();

        public List<Role> Roles { get; set; } = new List<Role>();

        public Chat() { }
        
        public Chat(ChatMap map)
        {
            Name = map.Name;
            Description = map.Description;
        }
    }
}