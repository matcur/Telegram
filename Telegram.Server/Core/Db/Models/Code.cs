using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public Code()
        {
            Value = new Random().Next(99999, 1000000).ToString();
        }
    }
}
