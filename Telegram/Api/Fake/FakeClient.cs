using System.Net.Http;
using System.Threading.Tasks;

namespace Telegram.Api.Fake
{
    public class FakeClient : IApiClient
    {
        private readonly string url = "https://localhost:44383/api/";

        private readonly HttpClient client = new HttpClient();

        public FakeClient(string version = "1.0")
        {
            url += version + "/";
        }

        public async Task<string> Get(string resource)
        {
            var response = await client.GetAsync(url + resource);

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> Post(string resource, HttpContent body)
        {
            var response = await client.PostAsync(url + resource, body);

            return await response.Content.ReadAsStringAsync();
        }
    }
}
