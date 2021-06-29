﻿using System;
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
using Telegram.ViewModels;

namespace Telegram.Pages
{
    /// <summary>
    /// Interaction logic for Index.xaml
    /// </summary>
    public partial class Index : Page
    {
        private readonly IndexViewModel viewModel;

        public Index()
        {
            var messages1 = new ObservableCollection<Message> { new Message { Content = "Tor" }, new Message { Content = "Message" } };
            var messages2 = new ObservableCollection<Message> { new Message { Content = "Odin" }, new Message { Content = "Adin" } };
            var chats = new List<Chat>
            {
                new Chat { Description = "Fruits", Name = "Fruits", Messages = messages1 },
                new Chat { Description = "Fuck - 1", Name = "Cars", Messages = messages2 },
                new Chat { Description = "Fuck - 2", Name = "Limb", Messages = messages1 },
            };
            viewModel = new IndexViewModel(new ChatSearch(chats));
            DataContext = viewModel;
            InitializeComponent();
        }
    }
}