using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class Content
    {
        [Key]
        public int Id { get; set; }

        public string Value { get; set; }

        public ContentType Type { get; set; }

        public List<ContentMessage> ContentMessages { get; set; } = new List<ContentMessage>();

        public Content() { }

        public Content(ContentMap map)
        {
            Value = map.Value;
            Type = map.Type;
        }
    }
}
