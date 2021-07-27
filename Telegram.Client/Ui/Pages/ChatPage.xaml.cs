using System.Windows;
using System.Windows.Controls;
using Microsoft.AspNetCore.SignalR.Client;
using Telegram.Client.Api.Fake.Sockets;
using Telegram.Client.Api.Sockets;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.ViewModels;

namespace Telegram.Client.Ui.Pages
{
    /// <summary>
    /// Interaction logic for Chat.xaml
    /// </summary>
    public partial class ChatPage : Page
    {
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
                currentUser,
                socket
            );
            DataContext = viewModel;

            InitializeComponent();
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            if (loaded)
            {
                return;
            }
            
            loaded = true;
            
            var socketTask = socket.Start();
            var messagesTask = viewModel.LoadMessages();

            await socketTask;
            await messagesTask;
        }
    }
}
