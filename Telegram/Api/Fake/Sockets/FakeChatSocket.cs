using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Telegram.Api.Sockets;
using Telegram.Core.Models;

namespace Telegram.Api.Fake.Sockets
{
    public class FakeChatSocket : IChatSocket
    {
        private readonly HubConnection connection;

        public FakeChatSocket(IHubConnectionBuilder builder)
        {
            connection = builder
                .WithUrl("http://localhost:5001/chats")
                .Build();
        }

        public async Task Start()
        {
            await connection.StartAsync();
        }

        public void OnReceiveMessage(Action<int, Message> target)
        {
            connection.On<int, string>("ReceiveMessage", (id, message) =>
            {
                target(id, JsonSerializer.Deserialize<Message>(message));
            });
        }

        public async Task Emit(int chatId, Message message)
        {
            await connection.InvokeAsync("EmitMessage", chatId, JsonSerializer.Serialize(message));
        }
    }
}
