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

        public FakeUser(User user)
        {
            api = new FakeClient();
            this.user = user;
        }

        public async Task<RequestResult<List<Chat>>> Chats(int count)
        {
            var response = await api.Get(
                $"users/{user.Id}/chats?count={count}"
            );

            return Deserialize<List<Chat>>(response);
        }
    }
}
