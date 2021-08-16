using System.Threading.Tasks;
using Telegram.Client.Api.Resources;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeCodes : ApiResource, ICodesResource
    {
        private readonly IApiClient _api;

        public FakeCodes(IApiClient api)
        {
            _api = api;
        }

        public async Task Add(int userId)
        {
            await _api.Post("codes", Serialize(new { UserId = userId }));
        }
    }
}