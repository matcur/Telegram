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

        public async Task<BooleanResult> FromTelegram(Phone phone)
        {
            var response = await api.Post(
                "verification/from-telegram", Serialize(phone)
            );

            return Deserialize<BooleanResult>(response);
        }

        public async Task<BooleanResult> ByPhone(Phone phone)
        {
            var request = Serialize(phone);
            var response = await api.Post(
                "verification/by-phone", request
            );

            return Deserialize<BooleanResult>(response);
        }
    }
}
