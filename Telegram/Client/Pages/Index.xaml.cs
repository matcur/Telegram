using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
using Telegram.Api.Resources;
using Telegram.Core.Models;
using Telegram.Core.Searching;
using Telegram.Client.ViewModels;
using System.ComponentModel;
using System.IO;
using Telegram.Api.Fake.Resources;

namespace Telegram.Client.Pages
{
    /// <summary>
    /// Interaction logic for Index.xaml
    /// </summary>
    public partial class Index : Page
    {
        private readonly IndexViewModel viewModel;
        
        private readonly User currentUser;
        
        private readonly IChatsResource chats;

        public Index()
        {
            currentUser = new User { Id = 1 };
            chats = new FakeChats();
            viewModel = new IndexViewModel();
            viewModel.PropertyChanged += OnChatSelected;
            DataContext = viewModel;
            InitializeComponent();
        }

        public Index(User current, IChatsResource chatsResource)
        {
            currentUser = current;
            chats = chatsResource;
            viewModel = new IndexViewModel();
            viewModel.PropertyChanged += OnChatSelected;
            DataContext = viewModel;
            InitializeComponent();
        }

        private void OnChatSelected(object sender, PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(viewModel.SelectedChat))
            {
                frame.Navigate(new ChatPage(viewModel.SelectedChat, currentUser));
            }
        }

        private void CreateChat(object sender, RoutedEventArgs e)
        {
            chats.Add(new Chat { Name = newChatNameInput.Text, Description = "test desc" });
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