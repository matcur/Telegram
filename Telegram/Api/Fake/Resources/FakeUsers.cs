using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Models;

namespace Telegram.Api.Fake.Resources
{
    public class FakeUsers : ApiResource, IUsersResource
    {
        private readonly FakeClient api;

        public FakeUsers()
        {
            api = new FakeClient();
        }

        public async Task<User> Register(User user)
        {
            var response = await api.Post(
                "user/register",
                Serialize(user)
            );

            return Deserialize<User>(response);
        }

        public async Task<User> Register(Phone phone)
        {
            var user = new User { FirstName = "", LastName = "", Phone = phone };

            return await Register(user);
        }
    }
}