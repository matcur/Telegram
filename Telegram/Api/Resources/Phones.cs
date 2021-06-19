using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace Telegram.Api.Resources
{
    public partial class Phones : ApiResource
    {
        private readonly ApiClient api;

        public Phones()
        {
            api = new ApiClient();
        }

        public async Task<bool> Exists(string number)
        {
            var response = await api.Get("phones/" + number + "/exists");

            return Deserialize<BooleanResult>(response).Result;
        }
    }
}