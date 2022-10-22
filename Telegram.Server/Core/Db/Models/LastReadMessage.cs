using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Telegram.Server.Core.Db.Models
{
    public class LastReadMessage
    {
        [ForeignKey(nameof(Chat))]
        public int ChatId { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [ForeignKey(nameof(Message))]
        public int? MessageId { get; set; }

        public Chat Chat { get; set; }

        public User User { get; set; }

        public Message Message { get; set; }

        public LastReadMessage() { }

        public LastReadMessage(User user, Chat chat, Message? message)
        {
            UserId = user.Id;
            ChatId = chat.Id;
            if (message != null)
            {
                MessageId = message.Id;
            }
        }
    }
}