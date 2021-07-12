using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Core.Models;

namespace Telegram.Api.Fake.Resources
{
    public class FakeChat : ApiResource, IChatResource
    {
        private readonly IApiClient api;

        private readonly int id;

        public FakeChat(Chat chat) : this(chat.Id) { }

        public FakeChat(int chatId)
        {
            api = new FakeClient();
            id = chatId;
        }

        public async Task<RequestResult<IEnumerable<Message>>> Messages(int offset, int count)
        {
            var resource = await api.Get($"chats/{id}/messages?offset={offset}&count={count}");

            return Deserialize<IEnumerable<Message>>(resource);
        }
    }
}
