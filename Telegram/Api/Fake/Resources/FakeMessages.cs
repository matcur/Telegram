using System.Threading.Tasks;
using Telegram.Api.Resources;
using Telegram.Core.Models;

namespace Telegram.Api.Fake.Resources
{
    public class FakeMessages : ApiResource, IMessagesResource
    {
        private readonly int chatId;
        
        private FakeClient api;

        public FakeMessages(Chat chat) : this(chat.Id)
        {
            api = new FakeClient();
        }

        public FakeMessages(int chatId)
        {
            this.chatId = chatId;
        }
    
        public async Task Save(Message message)
        {
            await api.Post($"chat/{chatId}/messages", Serialize(message));
        }

        public async Task Update(Message message)
        {
            await api.Post($"messages/{message.Id}/update", Serialize(message));
        }
    }
}