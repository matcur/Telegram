using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Npgsql.TypeHandling;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Extensions
{
    public static class DbUsersExtension
    {
        public static IEnumerable<Chat> DetailChats(this DbSet<User> self, int userId, int offset, int count)
        {
            return self
                .Where(u => u.Id == userId)
                .Include(u => u.Chats)
                .ThenInclude(c => c.Chat.Messages)
                .ThenInclude(m => m.Author)
                .Include(u => u.Chats)
                .ThenInclude(c => c.Chat.Messages)
                .ThenInclude(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Select(u => u.Chats.Select(c => new Chat
                {
                    Id = c.Chat.Id,
                    Name = c.Chat.Name,
                    Description = c.Chat.Description,
                    LastMessage = c.Chat.Messages.OrderByDescending(m => m.Id).FirstOrDefault(),
                    IconUrl = c.Chat.IconUrl,
                }))
                .First();
        }
    }
}