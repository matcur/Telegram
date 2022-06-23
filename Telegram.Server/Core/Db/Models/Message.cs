using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore.Storage;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Chat))]
        public int ChatId { get; set; }

        [ForeignKey(nameof(Author))]
        public int AuthorId { get; set; }
        
        [ForeignKey(nameof(ReplyTo))]
        public int? ReplyToId { get; set; }

        public bool Edited { get; set; } = false;

        public DateTime CreationDate { get; set; }

        public Chat Chat { get; set; }

        public User Author { get; set; }

        public Message ReplyTo { get; set; }

        public List<ContentMessage> ContentMessages { get; set; } = new List<ContentMessage>();

        public MessageType Type { get; set; } = MessageType.UserMessage;

        public Message() { }
        
        public Message(MessageMap map)
        {
            ChatId = map.ChatId;
            ContentMessages = map.ContentMessages;
            ReplyToId = map.ReplyToId;
        }
        
        public Message(UpdateMessageMap map)
        {
            ChatId = map.ChatId;
            AuthorId = map.AuthorId;
            ContentMessages = map.ContentMessages;
        }
    }
}
