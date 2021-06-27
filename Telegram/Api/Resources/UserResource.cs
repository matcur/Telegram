using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public class UserResource : ApiResource
    {
        private readonly ApiClient api;

        private readonly User user;

        public UserResource(User user)
        {
            this.api = new ApiClient();
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
