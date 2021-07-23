using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Core.Models;

namespace Telegram.Api.Fake.Resources
{
    public class FakeUsers : ApiResource, IUsersResource
    {
        private readonly FakeClient api;

        public FakeUsers()
        {
            api = new FakeClient();
        }

        public async Task<RequestResult<User>> Register(User user)
        {
            var response = await api.Post(
                "user/register",
                Serialize(user)
            );

            return Deserialize<User>(response);
        }

        public async Task<RequestResult<User>> Register(Phone phone)
        {
            var user = new User { FirstName = "", LastName = "", Phone = phone };

            return await Register(user);
        }

        public async Task<RequestResult<User>> Find(Phone phone)
        {
            var response = await api.Get($"users/{phone.OwnerId}");

            return Deserialize<User>(response);
        }
    }
}