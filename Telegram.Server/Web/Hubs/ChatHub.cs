using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core.Db;
using Telegram.Server.Core.Db.Models;

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