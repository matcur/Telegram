using System.Collections.Generic;

namespace Telegram.Server.Core.Mapping
{
    public class MessageMap
    {
        public UserMap Author { get; set; }

        public List<ContentMap> Content { get; set; }
    }
}
