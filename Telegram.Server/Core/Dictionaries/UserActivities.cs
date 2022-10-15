using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Core.Services.Controllers;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server.Core.Dictionaries
{
    public class UserActivities
    {
        private static readonly DeepDictionary<int, string, bool> Activities =
            new DeepDictionary<int, string, bool>();
        
        private static readonly Dictionary<int, DateTime> LastUserActivityTimes =
            new Dictionary<int, DateTime>();

        private readonly UserService _users;

        public UserActivities(UserService users)
        {
            _users = users;
        }

        public async Task Online(int userId, string deepKey)
        {
            LastUserActivityTimes[userId] = DateTime.Now;
            await _users.UpdateLastActivity(userId);
            Activities.Put(
                userId,
                deepKey,
                true
            );
        }

        public async Task Offline(int userId, string deepKey)
        {
            LastUserActivityTimes[userId] = DateTime.Now;
            await _users.UpdateLastActivity(userId);
            Activities.Put(userId, deepKey, false);
        }

        public void Remove(int userId, string deepKey)
        {
            Activities.Remove(userId, deepKey);
        }

        public bool IsOnline(int userId)
        {
            return Activities.Any(userId, online => online);
        }

        public bool IsOffline(int userId)
        {
            return !IsOnline(userId);
        }

        public DateTime LastActivity(int userId)
        {
            if (LastUserActivityTimes.ContainsKey(userId))
            {
                return LastUserActivityTimes[userId];
            }

            LastUserActivityTimes[userId] = _users.LastActivity(userId);
            
            return LastUserActivityTimes[userId];
        }
    }
}