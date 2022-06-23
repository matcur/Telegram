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

        public Task EmitNewMessage(Message message)
        {
            return Clients(message).SendAsync("MessageAdded", Serialize(message));
        }

        public Task EmitUpdatedMessage(Message message)
        {
            return Clients(message).SendAsync("MessageUpdated", Serialize(message));
        }

        private IClientProxy Clients(Message message)
        {
            return _chatHub.Clients
                .Group(message.ChatId.ToString());
        }
    }
}