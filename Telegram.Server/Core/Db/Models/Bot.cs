using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Telegram.Server.Core.Db.Models
{
    public class Bot
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        
        public List<ChatBot> Chats { get; set; } = new List<ChatBot>();

        public string ServerUrl { get; set; }
    }
}