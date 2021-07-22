using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Telegram.Api.Fake.Resources;
using Telegram.Api.Fake.Sockets;
using Telegram.Api.Resources;
using Telegram.Api.Sockets;
using Telegram.Client.ViewModels;
using Telegram.Core.Models;

namespace Telegram.Client.Pages
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
