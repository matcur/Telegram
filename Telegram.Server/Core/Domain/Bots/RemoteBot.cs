using System.Net.Http;
using System.Threading.Tasks;
using Telegram.Server.Core.Db.Extensions;
using Telegram.Server.Core.Db.Models;

namespace Telegram.Server.Core.Domain.Bots
{
    public class RemoteBot : IDomainBot
    {
        private readonly Bot _bot;

        private readonly HttpClient _http;

        public RemoteBot(Bot bot)
        {
            _bot = bot;
            _http = new HttpClient();
        }

        public async Task Act(Message message)
        {
            var command = message.ContentByType(ContentType.Text).Value;
            
            var form = new MultipartFormDataContent();
            form.Add(new StringContent(command), "command");
            form.Add(new StringContent(message.ChatId.ToString()), "chatId");

            await _http.PostAsync(_bot.ServerUrl, form);
        }
    }
}