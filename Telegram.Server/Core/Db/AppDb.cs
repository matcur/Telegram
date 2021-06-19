using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Db
{
    public class AppDb : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Phone> Phones { get; set; }

        public DbSet<Code> Codes { get; set; }

        public DbSet<Chat> Chats { get; set; }

        public DbSet<Message> Messages { get; set; }
        
        public AppDb(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}