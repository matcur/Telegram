using System;
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
            if (!IsCommand(message))
            {
                return;
            }
            
            var bots = await Bots(message.ChatId);
            var tasks = new List<Task>();
            foreach (var bot in bots)
            {
                tasks.Add(bot.Act(message));
            }

            await Task.WhenAll(tasks);
        }

        private async Task<IEnumerable<IDomainBot>> Bots(int chatId)
        {
            var dbBots = await _bots
                .Where(b => b.Chats.Any(c => c.ChatId == chatId))
                .ToListAsync();

            var bots = new List<RemoteBot>();
            foreach (var dbBot in dbBots)
            {
                bots.Add(new RemoteBot(dbBot));
            }
            
            return bots;
        }

        private static bool IsCommand(Message message)
        {
            return message.ContentByType(ContentType.Text).Value.StartsWith("/");
        }
    }
}