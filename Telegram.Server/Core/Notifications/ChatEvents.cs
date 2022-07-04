using System.Threading.Tasks;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Domain.Bots;
using Telegram.Server.Core.Services.Controllers;
using Telegram.Server.Core.Services.Hubs;

namespace Telegram.Server.Core.Notifications
{
    public class ChatEvents
    {
        private readonly ChatHubService _chatHub;
        
        private readonly ChatBots _bots;
        
        private readonly ChatService _chats;

        public ChatEvents(ChatHubService chatHub, ChatBots bots, ChatService chats)
        {
            _chatHub = chatHub;
            _bots = bots;
            _chats = chats;
        }

        public async Task OnMessageAdded(Message message)
        {
            await _chats.Update(message.ChatId);
            await _chatHub.EmitNewMessage(message);
            await _bots.Act(message);
        }

        public Task OnMessageUpdated(Message message)
        {
            return _chatHub.EmitUpdatedMessage(message);
        }
    }
}