using System.ComponentModel.DataAnnotations;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class PhoneMap
    {
        [Required]
        public string Number { get; set; }

        public int OwnerId { get; set; }

        public PhoneMap() { }

        public PhoneMap(Phone phone)
        {
            Number = phone.Number;
            OwnerId = phone.OwnerId;
        }
    }
}