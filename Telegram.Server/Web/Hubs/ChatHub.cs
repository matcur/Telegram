using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Web.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly AuthorizedUserService _authorizedUser;

        public ChatHub(AuthorizedUserService authorizedUser)
        {
            _authorizedUser = authorizedUser;
        }

        public override async Task OnConnectedAsync()
        {
            if (!await _authorizedUser.MemberOf(ChatId()) && !await _authorizedUser.CreatorOf(ChatId()))
            {
                throw new Exception($"You are not member of {ChatId()}");
            }
            
            await Groups.AddToGroupAsync(Context.ConnectionId, ChatId().ToString());
        }
        
        public async Task EmitMessageTyping()
        {
            await Clients.OthersInGroup(ChatId().ToString())
                .SendAsync("MessageTyping", JsonTelegram.Serialize(await _authorizedUser.Get()));
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
