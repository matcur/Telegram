﻿using System.Threading.Tasks;
using Telegram.Api.Fake.Resources;
using Telegram.Api.Resources;
using Telegram.Api.Sockets;
using Telegram.Core;
using Telegram.Core.Models;

namespace Telegram.Ui.ViewModels
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
                AddMessage(new Message(Message));
                Message.Content.Clear();
            }
        );

        public RelayCommand UpdateMessageCommand => new RelayCommand(
            o => messagesResource.Update(Message)
        );

        public RelayCommand SendMessageCommand { get; set; }

        private Message message = new Message();

        private readonly User currentUser;
        
        private readonly IChatSocket chatSocket;

        private readonly IChatResource chatResource;

        private readonly IMessagesResource messagesResource;

        public ChatViewModel(Chat chat, User current, IChatSocket socket)
        {
            Chat = chat;
            messagesResource = new FakeMessages();
            chatResource = new FakeChat(chat);
            currentUser = current;
            chatSocket = socket;
            message.Author = current;
            SendMessageCommand = AddMessageCommand;
            socket.OnReceiveMessage(OnReceiveMessage);
        }

        public async Task LoadMessages()
        {
            var response = await chatResource.Messages(0, 10);
            var messages = response.Result;

            foreach (var message in messages)
            {
                Chat.Messages.Add(message);
            }
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