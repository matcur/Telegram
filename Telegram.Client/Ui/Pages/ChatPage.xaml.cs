using System.Windows;
using System.Windows.Controls;
using Microsoft.AspNetCore.SignalR.Client;
using Telegram.Api.Fake.Sockets;
using Telegram.Api.Sockets;
using Telegram.Core.Models;
using Telegram.Ui.ViewModels;

namespace Telegram.Ui.Pages
{
    /// <summary>
    /// Interaction logic for Chat.xaml
    /// </summary>
    public partial class ChatPage : Page
    {
        private readonly IChatSocket socket;

        private readonly ChatViewModel viewModel;

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
            var socketTask = socket.Start();
            var messagesTask = viewModel.LoadMessages();

            await socketTask;
            await messagesTask;
        }
    }
}
