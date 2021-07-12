using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telegram.Core.Models
{
    public class Code : Model
    {
        public int UserId { get; set; }

        public string Value { get; set; }

        public Code()
        {
            
        }

        public Code(Phone phone)
        {
            UserId = phone.OwnerId;
            Value = "";
        }
    }
}
