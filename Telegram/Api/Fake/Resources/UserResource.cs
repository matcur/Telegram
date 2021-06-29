using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Models;

namespace Telegram.Api.Fake.Resources
{
    public class UserResource : ApiResource, IUserResource
    {
        private readonly FakeClient api;

        private readonly User user;

        public UserResource(User user)
        {
            api = new FakeClient();
            this.user = user;
        }

        public async Task<List<Chat>> Chats(int count)
        {
            var response = await api.Get(
                $"users/{user.Id}/chats?count={count}"
            );

            return Deserialize<List<Chat>>(response);
        }
    }
}
