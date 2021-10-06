using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Extensions;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Domain.Bots
{
    public class ChatBots : IDomainBot
    {
        private readonly DbSet<Bot> _bots;

        public ChatBots(AppDb db)
        {
            _bots = db.Bots;
        }

        public async Task Act(Message message)
        {
            var bots = await Bots(message.ChatId);
            foreach (var bot in bots)
            {
                bot.Act(message);
            }
        }

        private async Task<IEnumerable<IDomainBot>> Bots(int chatId)
        {
            var dbBots = await _bots
                .Where(b => b.Chats.Any(c => c.ChatId == chatId))
                .ToListAsync();

            var bots = new List<RemoteBot>();
            foreach (var dbBot in dbBots)
            {
                bots.Add(new RemoteBot(dbBot, chatId));
            }
            
            return bots;
        }
    }
}