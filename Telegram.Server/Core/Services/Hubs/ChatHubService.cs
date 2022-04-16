using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server.Core.Services.Hubs
{
    public class ChatHubService : HubService
    {
        private readonly IHubContext<ChatHub> _chatHub;

        public ChatHubService(IHubContext<ChatHub> chatHub)
        {
            _chatHub = chatHub;
        }

        public Task EmitMessage(Message message)
        {
            return _chatHub.Clients
                .Group(message.ChatId.ToString())
                .SendAsync("ReceiveMessage", Serialize(message));
        }
    }
}