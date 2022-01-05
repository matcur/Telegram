using System.Collections.Generic;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class UpdateMessageMap
    {
        public int Id { get; set; }

        public int ChatId { get; set; }

        public int AuthorId { get; set; }

        public List<ContentMessage> ContentMessages { get; set; }
    }
}