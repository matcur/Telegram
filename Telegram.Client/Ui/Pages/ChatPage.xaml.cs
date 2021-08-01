﻿using System.Windows;
using System.Windows.Controls;
using System.Windows.Forms;
using Microsoft.AspNetCore.SignalR.Client;
using Telegram.Client.Api.Fake.Sockets;
using Telegram.Client.Api.Sockets;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.UserControls.ChatPage;
using Telegram.Client.Ui.ViewModels;
using Message = Telegram.Client.Core.Models.Message;

namespace Telegram.Client.Ui.Pages
{
    /// <summary>
    /// Interaction logic for Chat.xaml
    /// </summary>
    public partial class ChatPage : Page
    {
        public const int MessagePerRequest = 10;
        
        private readonly IChatSocket socket;

        private readonly ChatViewModel viewModel;

        private bool loaded = false;

        public ChatPage(Chat chat, User currentUser)
        {
            socket = new FakeChatSocket(
                new HubConnectionBuilder()
            );
            viewModel = new ChatViewModel(
                chat,
                socket
            );
            DataContext = viewModel;

            InitializeComponent();

            Input.Message = new Message {Author = currentUser};
            Input.Submitting += viewModel.SendMessage;
            Body.ScrolledToTop += OnScrolledToTop;
        }

        private async void OnScrolledToTop()
        {
            await viewModel.LoadPreviousMessages(MessagePerRequest);
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            if (loaded)
            {
                return;
            }
            
            loaded = true;
            
            var socketTask = socket.Start();
            var messagesTask = viewModel.LoadMessages(0, MessagePerRequest);

            await socketTask;
            await messagesTask;
        }
    }
}
