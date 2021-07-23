using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Sockets
{
    public interface IChatSocket
    {
        Task Start();

        void OnReceiveMessage(Action<int, Message> target);

        Task Emit(int chatId, Message message);
    }
}
