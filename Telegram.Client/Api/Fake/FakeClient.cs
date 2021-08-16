using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Telegram.Client.Api.Fake
{
    public class FakeClient : IApiClient
    {
        public string Host => _host;

        private const string _host = "http://localhost:5000/";

        private readonly string _url = _host + "api/";

        private readonly HttpClient _client;

        public FakeClient(string version = "1.0") : this(new HttpClient(), version)
        {
        }

        public FakeClient(HttpClient client, string version = "1.0")
        {
            _client = client;
            _url += version + "/";
        }

        public async Task<string> Get(string resource)
        {
            var response = await _client.GetAsync(_url + resource);

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> Post(string resource, HttpContent body)
        {
            var response = await _client.PostAsync(_url + resource, body);

            return await response.Content.ReadAsStringAsync();
        }

        public void AddHeader(string key, string value)
        {
            _client.DefaultRequestHeaders.Add(key, value);            
        }
    }
}
