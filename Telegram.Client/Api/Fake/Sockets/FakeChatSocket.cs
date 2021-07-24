using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Telegram.Client.Api.Sockets;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Api.Fake.Sockets
{
    public class FakeChatSocket : IChatSocket
    {
        private readonly HubConnection connection;

        public FakeChatSocket(IHubConnectionBuilder builder)
        {
            connection = builder
                .WithUrl("http://localhost:5000/chats")
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
