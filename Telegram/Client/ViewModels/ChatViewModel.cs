using Telegram.Api.Fake.Resources;
using Telegram.Api.Resources;
using Telegram.Core;
using Telegram.Core.Models;

namespace Telegram.Client.ViewModels
{
    public class ChatViewModel : ViewModel
    {
        public Chat Chat { get; }

        public Message Message
        {
            get => message;
            set
            {
                message = value;
                OnPropertyChanged(nameof(Message));
            }
        }

        public RelayCommand AddMessageCommand => new RelayCommand(
            o =>
            {
                AddMessage(Message);
                Message = new Message { Author = currentUser };
            }
        );

        public RelayCommand UpdateMessageCommand => new RelayCommand(
            o => messages.Update(Message)
        );

        public RelayCommand SendMessageCommand
        {
            get => sendMessageCommand;
            set => sendMessageCommand = value;
        }

        private RelayCommand sendMessageCommand;
        
        private Message message = new Message();

        private readonly User currentUser;

        private readonly IChatResource chatResource;

        private readonly IMessagesResource messages;

        public ChatViewModel(Chat chat, User current)
        {
            Chat = chat;
            messages = new FakeMessages();
            chatResource = new FakeChat(chat);
            currentUser = current;
            message.Author = current;
            sendMessageCommand = AddMessageCommand;
        }

        private void AddMessage(Message message)
        {
            chatResource.AddMessage(message);
            Chat.Messages.Add(message);
        }
    }
}