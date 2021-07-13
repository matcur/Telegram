using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Mapping
{
    public class MessageMap
    {
        public UserMap Author { get; set; }

        public List<ContentMap> Content { get; set; }
    }
}
