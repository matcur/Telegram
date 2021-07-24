﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Resources
{
    public interface IChatsResource
    {
        Task<IEnumerable<Chat>> Iterate(User user, int count);

        Task<RequestResult> Add(Chat chat);
    }
}