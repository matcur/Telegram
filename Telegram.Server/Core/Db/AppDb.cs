using Microsoft.EntityFrameworkCore;
using System;
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

        public DbSet<Content> Contents { get; set; }

        public AppDb(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Content>()
                .Property(c => c.Type)
                .HasConversion(
                    v => v.ToString(),
                    v => (ContentType)Enum.Parse(typeof(ContentType), v)
                );
            
            modelBuilder.Entity<ChatUser>()
                .HasKey(nameof(ChatUser.UserId), nameof(ChatUser.ChatId));
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=telegram;Username=root;Password=root");
        }
    }
}