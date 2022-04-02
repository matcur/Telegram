using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core.Auth;

namespace Telegram.Server.Web.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly AuthorizedUser _authorizedUser;

        public ChatHub(AuthorizedUser authorizedUser)
        {
            _authorizedUser = authorizedUser;
        }

        public override Task OnConnectedAsync()
        {
            if (!_authorizedUser.MemberOf(ChatId()))
            {
                throw new Exception($"User with id = {_authorizedUser.Id()} is not member of {ChatId()}");
            }
            
            return Groups.AddToGroupAsync(Context.ConnectionId, ChatId().ToString());
        }

        public async Task EmitMessage(string message)
        {
            await Clients.Group(ChatId().ToString()).SendAsync("ReceiveMessage", message);
        }

        private int ChatId()
        {
            var query = Context.GetHttpContext().Request.Query;
            if (!query.ContainsKey("chatId"))
            {
                throw new Exception("Can't find chatId in query params.");
            }

            var chatId = query["chatId"];
            if (string.IsNullOrEmpty(chatId))
            {
                throw new Exception("'chatId' must be specified.");
            }

            if (!int.TryParse(chatId, out var result))
            {
                throw new Exception("'chatId' must be int.");
            }
            
            return result;
        }
    }
}
