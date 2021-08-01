using System.Linq;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Db.Extensions
{
    public static class MessagesExtension
    {
        public static IQueryable<Message> Details(this DbSet<Message> source, Chat chat)
        {
            return source.Where(m => m.ChatId == chat.Id)
                .Include(m => m.Content)
                .Include(m => m.Author)
                .OrderByDescending(m => m.Id);
        }
    }
}