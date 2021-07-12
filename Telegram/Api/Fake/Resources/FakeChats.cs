using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Core.Models;

namespace Telegram.Api.Fake.Resources
{
    public class FakeChats : ApiResource, IChatsResource
    {
        private readonly FakeClient api;

        public FakeChats()
        {
            api = new FakeClient();
        }

        public async Task<RequestResult> Add(Chat chat)
        {
            var response = await api.Post("chats/create", Serialize(chat));

            return Deserialize(response);
        }

        public async Task<IEnumerable<Chat>> Iterate(User user, int count)
        {
            var response = await api.Get($"users/{user.Id}/chats?count={count}");
            
            return Deserialize<IEnumerable<Chat>>(response).Result;
        }
    }
}