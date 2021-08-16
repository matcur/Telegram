using System.Collections.Generic;
using System.Threading.Tasks;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Api.Resources;
using Telegram.Client.Api.Sockets;
using Telegram.Client.Core;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.ViewModels
{
    public class ChatViewModel : ViewModel
    {
        public Chat Chat { get; }

        public RelayCommand AddMessageCommand => new RelayCommand(
            message =>
            {
                AddNewMessage((Message)message);
            }
        );

        public RelayCommand SendMessageCommand { get; set; }

        private readonly IChatSocket _chatSocket;

        private readonly IChatResource _chatResource;

        public ChatViewModel(Chat chat, IChatSocket socket, IChatResource chatResource)
        {
            Chat = chat;
            _chatResource = chatResource;
            _chatSocket = socket;
            SendMessageCommand = AddMessageCommand;
            socket.OnReceiveMessage(OnReceiveMessage);
        }

        public async Task LoadMessages(int offset, int count)
        {
            var response = await _chatResource.Messages(offset, count);
            var messages = response.Result;

            foreach (var message in messages)
            {
                Chat.Messages.Add(message);
            }
        }

        public async Task LoadPreviousMessages(int count)
        {
            var loaded = Chat.Messages;
            var response = await _chatResource.Messages(loaded.Count, count);
            
            loaded.InsertRange(0, response.Result);
        }

        public void SendMessage(Message message)
        {
            SendMessageCommand.Execute(message);
        }

        private void OnReceiveMessage(int chatId, Message message)
        {
            if (chatId == Chat.Id)
            {
                Chat.Messages.Add(message);
            }
        }

        private void AddNewMessage(Message message)
        {
            _chatResource.AddMessage(message);
            _chatSocket.Emit(Chat.Id, message);
        }
    }
}