using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Services.Controllers
{
    public class MessageService
    {
        private readonly AppDb _db;
        
        private readonly DbSet<Message> _messages;

        public MessageService(AppDb db)
        {
            _db = db;
            _messages = db.Messages;
        }

        public async Task<IEnumerable<Message>> Filtered(int chaiId, int offset, int count)
        {
            var result = await Details(chaiId)
                .Skip(offset)
                .Take(count)
                .ToListAsync();
            result.Reverse();

            return result;
        }
        
        private IQueryable<Message> Details(int id)
        {
            return _messages.Where(m => m.ChatId == id)
                .Include(m => m.ContentMessages)
                .ThenInclude(c => c.Content)
                .Include(m => m.Author)
                .OrderByDescending(m => m.Id);
        }
    }
}