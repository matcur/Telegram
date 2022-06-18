using System.Collections.Generic;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class MessageMap
    {
        public int ChatId { get; set; }

        public int? ReplyToId { get; set; }

        public List<ContentMessage> ContentMessages { get; set; }

        public MessageType Type { get; set; }

        public MessageMap() {}

        public MessageMap(int chatId, MessageType type)
        {
            ChatId = chatId;
            Type = type;
        }
    }
}
