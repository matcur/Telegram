﻿using System;
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
using Telegram.Api.Resources;
using Telegram.Client.ViewModels;
using Telegram.Core.Models;

namespace Telegram.Client.Pages
{
    /// <summary>
    /// Interaction logic for Chat.xaml
    /// </summary>
    public partial class ChatPage : Page
    {
        private readonly ChatViewModel viewModel;

        private readonly IChatResource chat;

        public ChatPage(Chat chat, User currentUser)
        {
            viewModel = new ChatViewModel(chat, currentUser);
            DataContext = viewModel;
            this.chat = new FakeChat(chat);
            Loaded += OnLoaded;

            InitializeComponent();
        }

        private async void OnLoaded(object sender, RoutedEventArgs e)
        {
            var response = await chat.Messages(0, 10);
            var messages = response.Result;

            foreach (var message in messages)
            {
                viewModel.Chat.Messages.Add(message);
            }
        }
    }
}
