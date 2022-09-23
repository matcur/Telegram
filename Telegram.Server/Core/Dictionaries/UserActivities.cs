using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Telegram.Server.Web.Hubs;

namespace Telegram.Server.Core.Dictionaries
{
    public class UserActivities
    {
        private static readonly DeepDictionary<int, string, bool> Activities =
            new DeepDictionary<int, string, bool>();

        public void Online(int userId, string deepKey)
        {
            Activities.Put(
                userId,
                deepKey,
                true
            );
        }

        public void Offline(int userId, string deepKey)
        {
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
    }
}