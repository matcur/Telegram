using System;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Resources
{
    public interface IMessagesResource
    {
        Task Update(Message message);
    }
}