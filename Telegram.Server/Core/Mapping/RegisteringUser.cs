using System.ComponentModel.DataAnnotations;

namespace Telegram.Server.Core.Mapping
{
    public class RegisteringUser
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public PhoneMap Phone { get; set; }
    }
}