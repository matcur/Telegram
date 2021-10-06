namespace Telegram.Server.Core.Db.Models
{
    public class ChatBot
    {
        public int BotId { get; set; }

        public int ChatId { get; set; }
        
        public Bot Bot { get; set; }

        public Chat Chat { get; set; }
    }
}