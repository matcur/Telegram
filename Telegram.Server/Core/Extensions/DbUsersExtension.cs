using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
                .ThenInclude(c => c.Messages)
                .ThenInclude(m => m.Author)
                .Include(u => u.Chats)
                .ThenInclude(c => c.Messages)
                .ThenInclude(m => m.Content)
                .Select(u => u.Chats.Select(c => new Chat
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    LastMessage = c.Messages.OrderByDescending(m => m.Id).FirstOrDefault(),
                    IconUrl = c.IconUrl,
                }))
                .First();
        }
    }
}