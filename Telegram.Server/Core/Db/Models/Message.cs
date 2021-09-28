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

        public Chat Chat { get; set; }

        public User Author { get; set; }

        public List<Content> Content { get; set; }

        public Message() { }
        
        public Message(MessageMap map)
        {
            AuthorId = map.AuthorId;
            ChatId = map.ChatId;
            Content = map.Content.Select(c => new Content(c)).ToList();
        }
    }
}
