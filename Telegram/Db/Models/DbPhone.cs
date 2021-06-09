using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Telegram.Models;

namespace Telegram.Db.Models
{
    public class DbPhone
    {
        public string Number { get; set; }

        [Key]
        [ForeignKey("Owner")]
        public int OwnerId { get; set; }

        public DbUser Owner { get; set; }

        public DbPhone(Phone phone)
        {
            Number = phone.Number;
        }
    }
}