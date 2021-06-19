using System.Net.Http.Json;
using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public class Codes : ApiResource
    {
        private readonly ApiClient api;

        public Codes()
        {
            api = new ApiClient();
        }

        public async Task Add(int userId)
        {
            await api.Post("codes", Serialize(new { UserId = userId }));
        }
    }
}