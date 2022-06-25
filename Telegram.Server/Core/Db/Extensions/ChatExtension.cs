using System.Linq;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Db.Extensions
{
    public static class ChatExtension
    {
        public static IQueryable<Chat> DetailChats(this DbSet<Chat> source)
        {
            return source
                .Include(c => c.Members)
                .ThenInclude(c => c.User)
                .Include(c => c.Messages)
                .ThenInclude(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Select(c => new Chat
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    LastMessage = c.Messages.OrderByDescending(m => m.Id).FirstOrDefault(),
                    IconUrl = c.IconUrl,
                    Members = c.Members,
                    Messages = c.Messages,
                });
        }
    }
}