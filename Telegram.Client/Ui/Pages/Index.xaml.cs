﻿using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using Telegram.Api.Fake.Resources;
using Telegram.Api.Resources;
using Telegram.Core.Models;
using Telegram.Ui.UserControls.Index;
using Telegram.Ui.ViewModels;

namespace Telegram.Ui.Pages
{
    /// <summary>
    /// Interaction logic for Index.xaml
    /// </summary>
    public partial class Index : Page
    {
        private readonly IndexViewModel viewModel;
        
        private readonly User currentUser;
        
        private readonly IChatsResource chats;

        public Index(): this(new User { Id = 1 }, new FakeChats())
        {
            
        }

        public Index(User current, IChatsResource chatsResource)
        {
            currentUser = current;
            chats = chatsResource;
            viewModel = new IndexViewModel();
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
                ChatFrame.Navigate(new ChatPage(viewModel.SelectedChat, currentUser));
            }
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            viewModel.ChatSearch.AddItems(
                new ObservableCollection<Chat>(
                    await chats.Iterate(currentUser, 20)
                )
            );
        }
    }
}