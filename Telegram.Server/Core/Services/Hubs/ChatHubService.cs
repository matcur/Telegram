using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server.Core.Services.Hubs
{
    public class ChatHubService
    {
        private readonly IHubContext<ChatHub> _chatHub;

        public ChatHubService(IHubContext<ChatHub> chatHub)
        {
            _chatHub = chatHub;
        }

        public Task EmitNewMessage(Message message)
        {
            return Clients(message).SendAsync("MessageAdded", JsonTelegram.Serialize(message));
        }

        public Task EmitUpdatedMessage(Message message)
        {
            return Clients(message).SendAsync("MessageUpdated", JsonTelegram.Serialize(message));
        }
        
        public Task EmitMemberDataChanged(List<int> chatIds, User user)
        {
            return _chatHub
                .Clients
                .Groups(chatIds.Select(c => c.ToString()).ToList())
                .SendAsync("MemberDataChanged", JsonTelegram.Serialize(user));
        }

        private IClientProxy Clients(Message message)
        {
            return _chatHub.Clients
                .Group(message.ChatId.ToString());
        }
    }
}