using System;
using System.Text.Json;
using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public partial class PhonesResources : ApiResource
    {
        private readonly ApiClient api;

        public PhonesResources()
        {
            api = new ApiClient();
        }

        public async Task<bool> Exists(string number)
        {
            var response = await api.Get("phones/" + number + "/exists");

            return Deserialize<RequestResult>(response).Success;
        }

        public async Task<RequestResult<Phone>> Find(Phone phone)
        {
            return await Find(phone.Number);
        }

        public async Task<RequestResult<Phone>> Find(string number)
        {
            var response = await api.Get($"phones/{number}");

            return Deserialize<RequestResult<Phone>>(response);
        }
    }
}