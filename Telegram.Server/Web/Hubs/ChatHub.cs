using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Telegram.Server.Web.Hubs
{
    public class ChatHub : Hub
    {
        public async Task EmitMessage(int chatId, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", chatId, message);
        }
    }
}