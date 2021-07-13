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

        public RelayCommand SaveMessageCommand => new RelayCommand(
            o =>
            {
                messages.Add(Message);
                Chat.Messages.Add(Message);
                Message = new Message {Author = currentUser};
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

        private readonly IMessagesResource messages;
        
        private RelayCommand sendMessageCommand;
        
        private Message message = new Message();

        private readonly User currentUser;
        
        public ChatViewModel(Chat chat, User currentUser)
        {
            Chat = chat;
            this.currentUser = currentUser;
            message.Author = currentUser;
            messages = new FakeMessages(chat);
            sendMessageCommand = SaveMessageCommand;
        }
    }
}