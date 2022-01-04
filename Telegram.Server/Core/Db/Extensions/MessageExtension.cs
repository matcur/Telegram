using System.Collections.Generic;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Db.Extensions
{
    public static class MessageExtension
    {
        public static Content ContentByType(this Message message, ContentType type)
        {
            return message.ContentMessages.Find(c => c.Content.Type == type).Content;
        }
    }
}