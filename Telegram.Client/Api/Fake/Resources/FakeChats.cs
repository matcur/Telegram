﻿using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeChats : ApiResource, IChatsResource
    {
        private readonly IApiClient _api;

        public FakeChats(IApiClient api)
        {
            _api = api;
        }

        public async Task<RequestResult> Add(string name, string description, FileStream icon)
        {
            var content = FormContent(name, description, icon);

            var response = await _api.Post("chats/create", content);

            return Deserialize(response);
        }

        public async Task<IEnumerable<Chat>> Iterate(User user, int count)
        {
            var response = await _api.Get($"users/{user.Id}/chats?count={count}");
            
            return Deserialize<IEnumerable<Chat>>(response).Result;
        }

        private MultipartFormDataContent FormContent(string name, string description, FileStream icon)
        {
            var content = new MultipartFormDataContent
            {
                {new StreamContent(icon), "Icon", icon.Name},
                {new StringContent(name), "Name"},
                {new StringContent(description), "Description"}
            };

            return content;
        }
    }
}