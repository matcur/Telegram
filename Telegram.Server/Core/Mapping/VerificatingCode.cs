using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class VerificatingCode
    {
        [Required]
        public string Value { get; set; }

        [Required]
        public int UserId { get; set; }

        public bool Equals(Code code)
        {
            return code.Value == Value &&
                   code.UserId == UserId;
        }
    }
}
