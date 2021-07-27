using System.Collections.Generic;

namespace Telegram.Client.Core.Models
{
    public class Message : Model
    {
        public static readonly Message Empty = new Message
        {
            Id = -1,
            Content = new List<Content>(),
            Author = User.Nobody,
        };

        public int Id { get; set; }

        public List<Content> Content { get; set; } = new List<Content>();

        public User Author { get; set; }

        public Message() {  }

        public Message(Message message)
        {
            Id = message.Id;
            Content = new List<Content>(message.Content);
            Author = message.Author;
        }
    }
}