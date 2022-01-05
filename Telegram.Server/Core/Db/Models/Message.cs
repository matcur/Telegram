using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Chat")]
        public int ChatId { get; set; }

        [ForeignKey("Author")]
        public int AuthorId { get; set; }

        public DateTime CreationDate { get; set; }

        public Chat Chat { get; set; }

        public User Author { get; set; }

        public List<ContentMessage> ContentMessages { get; set; } = new List<ContentMessage>();

        public Message() { }
        
        public Message(MessageMap map)
        {
            AuthorId = map.AuthorId;
            ChatId = map.ChatId;
            ContentMessages = map.ContentMessages;
        }
        
        public Message(UpdateMessageMap map)
        {
            ChatId = map.ChatId;
            AuthorId = map.AuthorId;
            ContentMessages = map.ContentMessages;
        }
    }
}
