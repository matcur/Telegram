using System.Linq;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Db.Extensions
{
    public static class MessageExtension
    {
        public static Content ContentByType(this Message message, ContentType type)
        {
            var contentMessage = message.ContentMessages.Find(c => c.Content.Type == type);
            return contentMessage?.Content;
        }

        public static IQueryable<Message> Filtered(this IQueryable<Message> self, Pagination pagination)
        {
            if (!string.IsNullOrEmpty(pagination.Text()))
            {
                return self.Where(m => m.ContentMessages.Any(
                        c => c.Content.Value.Contains(pagination.Text())
                    ));
            }

            return self;
        }

        public static IQueryable<Message> Details(this IQueryable<Message> self, int chatId)
        {
            return self
                .Where(m => m.ChatId == chatId)
                .Include(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Include(m => m.Author)
                .Include(m => m.AssociatedUsers)
                .ThenInclude(m => m.User)
                .OrderByDescending(m => m.Id);
        }
    }
}