using System.Threading.Tasks;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Domain.Bots;
using Telegram.Server.Core.Services.Hubs;

namespace Telegram.Server.Core.Notifications
{
    public class ChatEvents
    {
        private readonly AppDb _db;
        
        private readonly ChatHubService _chatHub;
        
        private readonly ChatBots _bots;

        public ChatEvents(AppDb db, ChatHubService chatHub, ChatBots bots)
        {
            _db = db;
            _chatHub = chatHub;
            _bots = bots;
        }

        public async Task OnMessageAdded(Message message)
        {
            await _chatHub.EmitNewMessage(message);
            await _bots.Act(message);
        }

        public Task OnMessageUpdated(Message message)
        {
            return _chatHub.EmitUpdatedMessage(message);
        }
    }
}