﻿using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Telegram.Client.Api.Fake.Resources
{
    public abstract class ApiResource
    {
        public HttpContent Serialize(object data)
        {
            return JsonContent.Create(data);
        }

        public RequestResult Deserialize(string content)
        {
            var settings = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,

            };

            return JsonSerializer.Deserialize<RequestResult>(content, settings);
        }

        public RequestResult<T> Deserialize<T>(string content)
        {
            var settings = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            settings.Converters.Add(new JsonStringEnumConverter());

            return JsonSerializer.Deserialize<RequestResult<T>>(content, settings);
        }
    }
}