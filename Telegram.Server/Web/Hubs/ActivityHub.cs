using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core.Auth;
using Telegram.Server.Core.Dictionaries;
using Telegram.Server.Core.Services.Controllers;

namespace Telegram.Server.Web.Hubs
{
    [Authorize]
    public class ActivityHub : TelegramHub
    {
        private readonly UserService _users;
        
        private readonly AuthorizedUser _authorizedUser;
        
        private readonly UserActivities _userActivities;
        
        private readonly int _changeTabDelay = 10;

        public ActivityHub(UserService users, AuthorizedUser authorizedUser)
        {
            _users = users;
            _authorizedUser = authorizedUser;
            _userActivities = new UserActivities(users);
        }

        public override async Task OnConnectedAsync()
        {
            var userId = IntFromQuery("userId");
            if (!await _users.Exists(userId))
            {
                throw new Exception($"User with id {userId} doesn't exists");
            }
            
            await Groups.AddToGroupAsync(Context.ConnectionId, userId.ToString());
            await NotifyCaller(userId);
        }

        public async Task EmitOnline()
        {
            var userId = EnsureCurrentUser();
            await _userActivities.Online(userId, Context.ConnectionId);
            await Emit(userId, "EmitOnline");
        }

        public async Task EmitOffline()
        {
            var userId = EnsureCurrentUser();
            await _userActivities.Offline(userId, Context.ConnectionId);
            await Task.Delay(_changeTabDelay);
            if (_userActivities.IsOffline(userId))
            {
                Emit(userId, "EmitOffline");
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var userId = IntFromQuery("userId");
            if (_authorizedUser.Id() == userId)
            {
                await EmitOffline();
                _userActivities.Remove(_authorizedUser.Id(), Context.ConnectionId);
            }
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId.ToString());
        }

        private Task NotifyCaller(int userId)
        {
            var isOnline = _userActivities.IsOnline(userId);
            return Clients
                .Caller
                .SendAsync(
                    isOnline ? "EmitOnline" : "EmitOffline",
                    userId,
                    _userActivities.LastActivity(userId)
                );
        }

        private Task Emit(int userId, string method)
        {
            return Clients
                .Group(userId.ToString())
                .SendAsync(method, userId, DateTime.Now);
        }
        
        private int EnsureCurrentUser()
        {
            var userId = IntFromQuery("userId");
            if (_authorizedUser.Id() != userId)
            {
                throw new Exception($"You can't change activity status. User id {userId}");
            }

            return userId;
        }
    }
}