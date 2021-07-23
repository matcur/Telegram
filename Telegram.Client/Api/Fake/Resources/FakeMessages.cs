using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Core.Models;

namespace Telegram.Api.Fake.Resources
{
    public class FakeMessages : ApiResource, IMessagesResource
    {
        private FakeClient api;

        public FakeMessages()
        {
            api = new FakeClient();
        }

        public async Task Update(Message message)
        {
            await api.Post($"messages/{message.Id}/update", Serialize(message));
        }
    }
}