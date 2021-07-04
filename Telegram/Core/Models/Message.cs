using Telegram.Client.Content;

namespace Telegram.Core.Models
{
    public class Message : Model
    {
        public static readonly Message Empty = new Message
        {
            Content = new TextContent("Empty message"),
        };

        public int Id { get; set; }

        public IContent Content { get; set; }

        public User Author { get; set; }
    }
}