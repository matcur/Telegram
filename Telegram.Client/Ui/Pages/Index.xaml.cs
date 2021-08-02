using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using Microsoft.AspNetCore.SignalR.Client;
using Telegram.Client.Api;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Api.Auth;
using Telegram.Client.Api.Fake.Sockets;
using Telegram.Client.Api.Resources;
using Telegram.Client.Api.Sockets;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.UserControls.Index;
using Telegram.Client.Ui.ViewModels;

namespace Telegram.Client.Ui.Pages
{
    /// <summary>
    /// Interaction logic for Index.xaml
    /// </summary>
    public partial class Index : Page
    {
        private readonly IndexViewModel viewModel;
        
        private readonly User currentUser;
        
        private readonly IChatsResource chats;

        private readonly Connections<IChatSocket> chatSockets = new Connections<IChatSocket>(
            () => new FakeChatSocket(new HubConnectionBuilder())
        );

        public Index() : this(new User{Id = 1, FirstName = "fuck"}, new FakeChats())
        {
            
        }

        public Index(User current, IChatsResource chatsResource)
        {
            currentUser = current;
            chats = chatsResource;
            viewModel = new IndexViewModel(chatSockets);
            viewModel.PropertyChanged += OnChatSelected;
            viewModel.BurgerIsClicked += ShowLeftMenu;
            DataContext = viewModel;
            
            InitializeComponent();
        }

        private void ShowLeftMenu()
        {
            UpLayer.LeftElement = new LeftMenu(UpLayer);
        }

        private void OnChatSelected(object sender, PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(viewModel.SelectedChat))
            {
                var selectedChat = viewModel.SelectedChat;
                var targetPage = viewModel.ChatPage(selectedChat, currentUser);
                
                ChatFrame.Navigate(targetPage);
            }
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            // TODO
            viewModel.ChatSearch.AddItems(
                new ObservableCollection<Chat>(
                    await chats.Iterate(currentUser, 20)
                )
            );
        }
    }
}