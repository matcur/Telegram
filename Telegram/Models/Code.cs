using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telegram.Models
{
    public class Code : Model
    {
        public string Value { get; }

        public Code()
        {
            Value = new Random().Next(100000, 1000000).ToString();
            Value = "111";
        }
    }
}
