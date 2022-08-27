using System;
using Microsoft.AspNetCore.SignalR;

namespace Telegram.Server.Web.Hubs
{
    public abstract class TelegramHub : Hub
    {
        protected int IntFromQuery(string key)
        {
            var query = Context.GetHttpContext().Request.Query;
            if (!query.ContainsKey(key))
            {
                throw new Exception($"Can't find '{key}' in query params.");
            }

            var chatId = query[key];
            if (string.IsNullOrEmpty(chatId))
            {
                throw new Exception($"'{key}' must be specified.");
            }

            if (!int.TryParse(chatId, out var result))
            {
                throw new Exception($"'{key}' must be int.");
            }
            
            return result;
        }
    }
}