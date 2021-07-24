using System.Threading.Tasks;
using Telegram.Client.Api.Resources;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeCodes : ApiResource, ICodesResource
    {
        private readonly FakeClient api;

        public FakeCodes()
        {
            api = new FakeClient();
        }

        public async Task Add(int userId)
        {
            await api.Post("codes", Serialize(new { UserId = userId }));
        }
    }
}