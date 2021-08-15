﻿using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Telegram.Client.Api.Fake
{
    public class FakeClient : IApiClient
    {
        public string Host => host;

        private const string host = "http://localhost:5000/";

        private readonly string url = host + "api/";

        private readonly HttpClient client;

        public FakeClient(string version = "1.0") : this(new HttpClient(), version)
        {
        }

        public FakeClient(HttpClient client, string version = "1.0")
        {
            this.client = client;
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

        public void AddHeader(string key, string value)
        {
            client.DefaultRequestHeaders.Add(key, value);            
        }
    }
}
