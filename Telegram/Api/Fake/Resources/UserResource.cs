using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Models;

namespace Telegram.Api.Fake.Resources
{
<<<<<<< HEAD:Telegram/Api/Fake/Resources/FakeUser.cs
    public class FakeUser : ApiResource, IUserResource
    {
        private readonly IApiClient api;
=======
    public class UserResource : ApiResource, IUserResource
    {
        private readonly FakeClient api;
>>>>>>> e3493bcadacf515b112929e71a779a4feba20139:Telegram/Api/Fake/Resources/UserResource.cs

        private readonly User user;

        public FakeUser(User user)
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
