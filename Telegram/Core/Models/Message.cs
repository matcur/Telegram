using System.Collections.Generic;

namespace Telegram.Core.Models
{
    public class Message : Model
    {
        public static readonly Message Empty = new Message
        {
            Content = new List<Content>(),
        };

        public int Id { get; set; }

        public List<Content> Content { get; set; } = new List<Content>();

        public User Author { get; set; }
    }
}