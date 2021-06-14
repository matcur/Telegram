using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Telegram.Server.Core.Db.Models;

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

        [Required]
        public List<CodeMap> Codes { get; set; }
    }
}