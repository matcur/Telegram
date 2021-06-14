using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telegram.Models
{
    public class Chat : Model
    {
        public string Name { get; set; }

        public List<Message> Messages { get; set; }

        public List<User> Members { get; set; }
    }
}
