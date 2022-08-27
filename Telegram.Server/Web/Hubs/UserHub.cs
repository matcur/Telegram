using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Telegram.Server.Core.Auth;

namespace Telegram.Server.Web.Hubs
{
    [Authorize]
    public class UserHub : TelegramHub
    {
        private readonly AuthorizedUser _authorizedUser;

        public UserHub(AuthorizedUser authorizedUser)
        {
            _authorizedUser = authorizedUser;
        }
        
        public override Task OnConnectedAsync()
        {
            var userId = IntFromQuery("userId");
            if (_authorizedUser.Id() != userId)
            {
                throw new Exception($"You can't connect to user hub(id {userId})");
            }

            return Groups.AddToGroupAsync(Context.ConnectionId, userId.ToString());
        }
    }
}