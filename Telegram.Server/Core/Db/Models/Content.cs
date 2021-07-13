using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class Content
    {

        [Key]
        public int Id { get; set; }

        public string Value { get; set; }

        public ContentType Type { get; set; }

        public List<Message> Messages { get; set; }

        public Content() { }

        public Content(ContentMap map)
        {
            Value = map.Value;
            Type = map.Type;
        }
    }
}
