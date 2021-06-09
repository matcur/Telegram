using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Db.Models;

namespace Telegram.Db
{
    public class AppDb : DbContext
    {
        public DbSet<DbUser> Users { get; set; }

        public DbSet<DbPhone> Phones { get; set; }

        public AppDb() : base("DefaultConnection") { }
    }
}
