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
            modelBuilder.Entity<ChatUser>()
                .HasKey(nameof(ChatUser.UserId), nameof(ChatUser.ChatId));
            
            modelBuilder.Entity<ChatUser>() 
                .HasOne(pt => pt.Chat)
                .WithMany(p => p.Members)
                .HasForeignKey(pt => pt.ChatId);
 
            modelBuilder.Entity<ChatUser>() 
                .HasOne(pt => pt.User) 
                .WithMany(t => t.Chats)
                .HasForeignKey(pt => pt.UserId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=telegram;Username=root;Password=root");
        }
    }
}