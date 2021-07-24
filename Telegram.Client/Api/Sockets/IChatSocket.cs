using System;
using System.Threading.Tasks;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Sockets
{
    public interface IChatSocket
    {
        Task Start();

        void OnReceiveMessage(Action<int, Message> target);

        Task Emit(int chatId, Message message);
    }
}
