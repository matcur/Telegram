using System.Windows;
using System.Windows.Controls;
using System.Windows.Forms;
using Microsoft.AspNetCore.SignalR.Client;
using Telegram.Client.Api.Fake.Sockets;
using Telegram.Client.Api.Resources;
using Telegram.Client.Api.Sockets;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.UserControls.ChatPage;
using Telegram.Client.Ui.UserControls.Notification;
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

        private bool _loaded = false;

        private readonly Chat _chat;
        
        private readonly IChatSocket _socket;

        private readonly ChatViewModel _viewModel;
        
        public ChatPage(Chat chat, User currentUser, IChatSocket socket, IChatResource chatResource)
        {
            _chat = chat;
            _socket = socket;
            _viewModel = new ChatViewModel(chat, socket, chatResource);
            DataContext = _viewModel;

            InitializeComponent();

            Input.Message = new Message {Author = currentUser};
            Input.Submitting += _viewModel.SendMessage;
            Body.ScrolledToTop += OnScrolledToTop;
            socket.OnReceiveMessage(ShowNotification);
        }

        private async void OnScrolledToTop()
        {
            await _viewModel.LoadPreviousMessages(MessagePerRequest);
        }

        private void ShowNotification(int chatId, Message message)
        {
            if (chatId == _chat.Id)
            {
                MainWindow.Notifications.AddNotification(
                    new MessageNotification(message, _chat)
                );
            }
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            if (_loaded)
            {
                return;
            }
            
            _loaded = true;
            
            var socketTask = _socket.Start();
            var messagesTask = _viewModel.LoadMessages(0, MessagePerRequest);

            await socketTask;
            await messagesTask;
        }
    }
}
