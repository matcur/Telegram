using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class Code
    {
        [Key]
        public int Id { get; set; }

        public string Value { get; set; }

        public bool Entered { get; set; } = false;

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User User { get; set; }

        public Code() { }

        public Code(CodeMap map)
        {
            Value = map.Value;
        }
    }
}
