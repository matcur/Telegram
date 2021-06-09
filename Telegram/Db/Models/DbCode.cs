using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Db.Models
{
    public class DbCode
    {
        [Key]
        public int Id { get; set; }

        public string Value { get; set; }

        public bool Entered { get; set; } = false;

        [ForeignKey("User")]
        public int UserId { get; set; }

        public DbUser User { get; set; }

        public DbCode(Code code)
        {
            Value = code.Value;
        }
    }
}
