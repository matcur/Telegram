using System.Threading.Tasks;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeMessages : ApiResource, IMessagesResource
    {
        private IApiClient api;

        public FakeMessages(IApiClient api)
        {
            this.api = api;
        }

        public async Task Update(Message message)
        {
            await api.Post($"messages/{message.Id}/update", Serialize(message));
        }
    }
}