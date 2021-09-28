using System.Collections.Generic;

namespace Telegram.Server.Core.Mapping
{
    public class MessageMap
    {
        public int ChatId { get; set; }

        public int AuthorId { get; set; }

        public List<ContentMap> Content { get; set; }
    }
}
