using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeUser : ApiResource, IUserResource
    {
        private readonly IApiClient api;

        private readonly User user;

        public FakeUser(User user, IApiClient api)
        {
            this.user = user;
            this.api = api;
        }

        public async Task<IEnumerable<Chat>> Chats(int count)
        {
            var response = await api.Get(
                $"authorized-user/chats?count={count}"
            );

            return Deserialize<List<Chat>>(response).Result;
        }
    }
}
