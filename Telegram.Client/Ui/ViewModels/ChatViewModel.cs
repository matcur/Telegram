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
                AddMessage((Message)message);
            }
        );

        public RelayCommand UpdateMessageCommand => new RelayCommand(
            message => messagesResource.Update((Message)message)
        );

        public RelayCommand SendMessageCommand { get; set; }

        private readonly IChatSocket chatSocket;

        private readonly IChatResource chatResource;

        private readonly IMessagesResource messagesResource;

        public ChatViewModel(Chat chat, IChatSocket socket)
        {
            Chat = chat;
            messagesResource = new FakeMessages();
            chatResource = new FakeChat(chat);
            chatSocket = socket;
            SendMessageCommand = AddMessageCommand;
            socket.OnReceiveMessage(OnReceiveMessage);
        }

        public async Task LoadMessages()
        {
            var response = await chatResource.Messages(0, 30);
            var messages = response.Result;

            foreach (var message in messages)
            {
                Chat.Messages.Add(message);
            }
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

        private void AddMessage(Message message)
        {
            chatResource.AddMessage(message);
            chatSocket.Emit(Chat.Id, message);
        }
    }
}