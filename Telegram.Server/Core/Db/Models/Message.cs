using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Telegram.Server.Core.Db.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        public string Content { get; set; }

        [ForeignKey("Chat")]
        public int ChatId { get; set; }

        [ForeignKey("Author")]
        public int AuthorId { get; set; }

        public Chat Chat { get; set; }

        public User Author { get; set; }
    }
}
