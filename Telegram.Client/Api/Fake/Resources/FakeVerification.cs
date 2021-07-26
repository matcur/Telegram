﻿using System.Threading.Tasks;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Resources
{
    public class FakeVerification : ApiResource, IVerificationResource
    {
        private readonly FakeClient api;

        public FakeVerification()
        {
            api = new FakeClient();
        }

        public async Task<RequestResult> FromTelegram(Phone phone)
        {
            var response = await api.Post(
                "verification/from-telegram", Serialize(phone)
            );

            return Deserialize(response);
        }

        public async Task<RequestResult> ByPhone(Phone phone)
        {
            var response = await api.Post(
                "verification/by-phone", Serialize(phone)
            );
            
            return Deserialize(response);
        }

        public async Task<bool> CheckCode(Code code)
        {
            var response = await api.Get(
                $"verification/check-code?Value={code.Value}&UserId={code.UserId}"
            );

            return Deserialize<bool>(response).Result;
        }
    }
}