namespace Telegram.Server.Core.Db.Models
{
    public class ContentMessage
    {
        public int MessageId { get; set; }

        public int ContentId { get; set; }
        
        public Message Message { get; set; }

        public Content Content { get; set; }
    }
}