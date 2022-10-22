using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Extensions
{
    public static class MessageExtension
    {
        public static Task<Message?> LastMessage(this DbSet<Message> messages, int chatId)
        {
            return messages
                .Where(m => m.ChatId == chatId)
                .OrderByDescending(m => m.Id)
                .FirstOrDefaultAsync();
        }
    }
}