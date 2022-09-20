using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core.Db.Models;
using Telegram.Server.Core.Mapping;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server.Core.Services.Hubs
{
    public class UserHubService
    {
        private readonly IHubContext<UserHub> _hub;

        public UserHubService(IHubContext<UserHub> hub)
        {
            _hub = hub;
        }

        public Task EmitUserUpdated(int notifyUserId, UpdatedUserMap updatedUser)
        {
            return EmitUserUpdated(new List<int> {notifyUserId}, updatedUser);
        }

        public Task EmitUserUpdated(List<int> notifyUserIds, UpdatedUserMap updatedUser)
        {
            return _hub
                .Clients
                .Groups(notifyUserIds.Select(id => id.ToString()).ToList())
                .SendAsync("UserOrFriendUpdated", JsonTelegram.Serialize(updatedUser));
        }

        public Task EmitAddedInChat(Chat chat)
        {
            return EmitAddedInChat(
                chat.Members.Select(m => m.UserId).ToList(),
                chat.Id
            );
        }

        public Task EmitAddedInChat(List<int> notifyUserIds, int chatId)
        {
            var ids = notifyUserIds.Select(id => id.ToString()).ToList();
            
            return _hub
                .Clients
                .Groups(ids)
                .SendAsync("AddedInChat", chatId);
        }
    }
}