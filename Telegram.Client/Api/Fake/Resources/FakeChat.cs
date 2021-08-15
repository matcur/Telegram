using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeChat : ApiResource, IChatResource
    {
        private readonly IApiClient api;

        private readonly Chat chat;

        public FakeChat(Chat chat, IApiClient api)
        {
            this.chat = chat;
            this.api = api;
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
