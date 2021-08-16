using System.Threading.Tasks;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Resources
{
    public partial class FakePhones : ApiResource, IPhonesResource
    {
        private readonly IApiClient _api;

        public FakePhones(IApiClient api)
        {
            _api = api;
        }

        public async Task<bool> Exists(string number)
        {
            var response = await _api.Get("phones/" + number + "/exists");

            return Deserialize<RequestResult>(response).Success;
        }

        public async Task<RequestResult<Phone>> Find(Phone phone)
        {
            return await Find(phone.Number);
        }

        public async Task<RequestResult<Phone>> Find(string number)
        {
            var response = await _api.Get($"phones/{number}");

            return Deserialize<Phone>(response);
        }
    }
}