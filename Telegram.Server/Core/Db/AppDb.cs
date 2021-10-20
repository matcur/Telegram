using Microsoft.EntityFrameworkCore;
using System;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Domain;

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

        public DbSet<Bot> Bots { get; set; }

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
            modelBuilder.Entity<ChatBot>()
                .HasKey(nameof(ChatBot.BotId), nameof(ChatBot.ChatId));

            modelBuilder.Entity<Message>()
                .Property(m => m.CreationDate)
                .HasDefaultValueSql("NOW()");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=telegram;Username=root;Password=root");
        }
    }
}