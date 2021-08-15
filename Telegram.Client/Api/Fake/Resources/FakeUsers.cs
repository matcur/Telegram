using System.Threading.Tasks;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeUsers : ApiResource, IUsersResource
    {
        private readonly IApiClient api;

        public FakeUsers(IApiClient api)
        {
            this.api = api;
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
            var response = await api.Get($"user/phone/{phone.Number}");

            return Deserialize<User>(response);
        }
    }
}