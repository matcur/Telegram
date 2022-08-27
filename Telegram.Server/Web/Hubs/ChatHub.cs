using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Web.Hubs
{
    [Authorize]
    public class ChatHub : TelegramHub
    {
        private readonly AuthorizedUserService _authorizedUser;

        public ChatHub(AuthorizedUserService authorizedUser)
        {
            _authorizedUser = authorizedUser;
        }

        public override async Task OnConnectedAsync()
        {
            var chatId = IntFromQuery("chatId");
            if (!await _authorizedUser.MemberOf(chatId) && !await _authorizedUser.CreatorOf(chatId))
            {
                throw new Exception($"You are not member of {chatId}");
            }
            
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
        }
        
        public async Task EmitMessageTyping()
        {
            await Clients.OthersInGroup(IntFromQuery("chatId").ToString())
                .SendAsync("MessageTyping", JsonTelegram.Serialize(await _authorizedUser.Get()));
        }
    }
}
