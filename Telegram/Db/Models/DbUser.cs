using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telegram.Db.Models
{
    public class DbUser
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DbPhone Phone { get; set; }

        public List<DbCode> Codes { get; set; } = new List<DbCode>();
    }
}
