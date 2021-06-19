using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Telegram.Api;
using Telegram.Models;

namespace Telegram.Api.Resources
{
    public class Verification : ApiResource
    {
        private readonly ApiClient api;

        public Verification()
        {
            api = new ApiClient();
        }

        public async Task<bool> FromTelegram(Phone phone)
        {
            var response = await api.Post(
                "verification/from-telegram", Serialize(phone)
            );

            return Deserialize<RequestResult>(response).Success;
        }

        public async Task<RequestResult> ByPhone(Phone phone)
        {
            var response = await api.Post(
                "verification/by-phone", Serialize(phone)
            );

            return Deserialize<RequestResult>(response);
        }

        public async Task<bool> CheckCode(Code code)
        {
            var response = await api.Get(
                $"verification/check-code?Value={code.Value}&UserId={code.UserId}"
            );

            return Deserialize<RequestResult>(response).Success;
        }
    }
}
