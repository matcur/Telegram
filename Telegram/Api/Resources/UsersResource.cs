using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public class UsersResource : ApiResource
    {
        private readonly ApiClient api;

        public UsersResource()
        {
            api = new ApiClient();
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