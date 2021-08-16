using System;
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
        private readonly IndexViewModel _viewModel;
        
        private readonly User _currentUser;
        
        private readonly IChatsResource _chatsResource;

        private readonly Connections<IChatSocket> _chatSockets = new Connections<IChatSocket>(
            () => new FakeChatSocket(new HubConnectionBuilder())
        );

        public Index(
            IUserResource userResource,
            IChatsResource chatsResource,
            Func<Chat, IChatResource> chatFactory
        ) : this(new User{Id = 1, FirstName = "fuck"}, userResource, chatsResource, chatFactory)
        {
            
        }

        public Index(
            User current,
            IUserResource userResource,
            IChatsResource chatsResource, 
            Func<Chat, IChatResource> chatFactory
        )
        {
            _chatsResource = chatsResource;
            _currentUser = current;
            _viewModel = new IndexViewModel(userResource, _chatSockets, chatFactory);
            _viewModel.PropertyChanged += OnChatSelected;
            _viewModel.BurgerIsClicked += ShowLeftMenu;
            DataContext = _viewModel;
            
            InitializeComponent();
        }

        private void ShowLeftMenu()
        {
            UpLayer.LeftElement = new LeftMenu(UpLayer, _chatsResource);
        }

        private void OnChatSelected(object sender, PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(_viewModel.SelectedChat))
            {
                var selectedChat = _viewModel.SelectedChat;
                var targetPage = _viewModel.ChatPage(selectedChat, _currentUser);
                
                ChatFrame.Navigate(targetPage);
            }
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            await _viewModel.LoadChats();
        }
    }
}