using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Api.Sockets;
using Telegram.Core.Models;

namespace Telegram.Api.Fake.Resources
{
    public class FakeChat : ApiResource, IChatResource
    {
        private readonly IApiClient api;

        private readonly Chat chat;

        public FakeChat(Chat chat)
        {
            api = new FakeClient();
            this.chat = chat;
        }

        public async Task<RequestResult> AddMessage(Message message)
        {
            var resource = await api.Post($"chats/{chat.Id}/messages/create", Serialize(message));

            return Deserialize(resource);
        }

        public async Task<RequestResult<IEnumerable<Message>>> Messages(int offset, int count)
        {
            var resource = await api.Get($"chats/{chat.Id}/messages?offset={offset}&count={count}");

            return Deserialize<IEnumerable<Message>>(resource);
        }
    }
}
