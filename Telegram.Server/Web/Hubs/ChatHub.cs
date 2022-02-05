using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Telegram.Server.Web.Hubs
{
    public class ChatHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            return Groups.AddAsync(Context.ConnectionId, ChatId());
        }

        public async Task EmitMessage(string message)
        {
            await Clients.Group(ChatId).SendAsync("ReceiveMessage", message);
        }

        private string ChatId()
        {
            return Context.Connection.GetHttpContext().Request.Query["chatId"];
        }
    }
}
