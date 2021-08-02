﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Telegram.Client.Api;
using Telegram.Client.Api.Sockets;
using Telegram.Client.Core;
using Telegram.Client.Core.Models;
using Telegram.Client.Core.Searching;
using Telegram.Client.Ui.Pages;

namespace Telegram.Client.Ui.ViewModels
{
    public class IndexViewModel : ViewModel
    {
        public event Action BurgerIsClicked = delegate {  };
        
        public Chat SelectedChat
        {
            get => selectedChat;
            set
            {
                selectedChat = value;
                OnPropertyChanged(nameof(SelectedChat));
            }
        }

        public Search<ObservableCollection<Chat>> ChatSearch { get; }

        public RelayCommand SearchTextChangedCommand { get; set; }

        public RelayCommand ShowLeftMenuCommand { get; set; }

        private Chat selectedChat;

        private readonly Dictionary<int, ChatPage> chatPages = new Dictionary<int, ChatPage>();

        private readonly IConnectionSource<IChatSocket> chatSockets;
        
        public IndexViewModel(IConnectionSource<IChatSocket> chatSockets)
            : this(new ChatSearch(new List<Chat>()), chatSockets)
        {
        }

        public IndexViewModel(
            Search<ObservableCollection<Chat>> chatSearch,
            IConnectionSource<IChatSocket> chatSockets
        )
        {
            this.chatSockets = chatSockets;
            ChatSearch = chatSearch;
            InitializeCommands();
        }

        public ChatPage ChatPage(Chat chat, User currentUser)
        {
            var id = chat.Id;
            if (chatPages.ContainsKey(id))
            {
                return chatPages[id];
            }

            return chatPages[id] = new ChatPage(chat, currentUser, chatSockets.New());
        }

        private void InitializeCommands()
        {
            SearchTextChangedCommand = new RelayCommand(
                text => OnSearchTextChanged(text)
            );
            ShowLeftMenuCommand = new RelayCommand(
                o => BurgerIsClicked()
            );
        }

        private string OnSearchTextChanged(object text)
        {
            return OnSearchTextChanged((string)text);
        }

        private string OnSearchTextChanged(string text)
        {
            return ChatSearch.Text = text;
        }
    }
}
