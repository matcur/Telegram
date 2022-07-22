using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string IconUrl { get; set; }

        [ForeignKey(nameof(Creator))]
        public int CreatorId { get; set; }

        public DateTime UpdatedDate { get; set; }

        [NotMapped]
        public Message LastMessage { get; set; }

        public ChatType Type { get; set; }

        public User Creator { get; set; }

        public List<Message> Messages { get; set; } = new List<Message>();

        public List<ChatUser> Members { get; set; } = new List<ChatUser>();

        public List<ChatBot> Bots { get; set; }

        public List<Role> Roles { get; set; } = new List<Role>();

        public Chat() { }
        
        public Chat(ChatMap map)
        {
            Name = map.Name;
            Description = map.Description;
            IconUrl = map.IconUrl;
            Members = map.Members.Select(m => new ChatUser(m.Id)).ToList();
        }
    }
}