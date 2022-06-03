using System.Threading.Tasks;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Domain.Bots;
using Telegram.Server.Core.Services.Hubs;

namespace Telegram.Server.Core.Notifications
{
    public class MessageAdded
    {
        private readonly AppDb _db;
        
        private readonly ChatHubService _chatHub;
        
        private readonly ChatBots _bots;

        public MessageAdded(AppDb db, ChatHubService chatHub, ChatBots bots)
        {
            _db = db;
            _chatHub = chatHub;
            _bots = bots;
        }

        public async Task Emit(Message message)
        {
            await _chatHub.EmitMessage(message);
            await _bots.Act(message);
        }
    }
}