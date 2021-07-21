using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Web.Hubs
{
    public class ChatHub : Hub
    {
        public async Task EmitMessage(string user, string content)
        {
            await Clients.Others.SendAsync("ReceiveMessage", user, content);
        }
    }
}