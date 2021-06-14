using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Telegram.Server.Core.Mapping;

namespace Telegram.Server.Core.Db.Models
{
    public class Phone
    {
        public string Number { get; set; }

        [Key]
        [ForeignKey("Owner")]
        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public Phone() { }
        
        public Phone(PhoneMap phone)
        {
            Number = phone.Number;
        }
    }
}