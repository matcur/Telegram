using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Telegram.Client.Api;
using Telegram.Client.Api.Resources;
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
            get => _selectedChat;
            set
            {
                _selectedChat = value;
                OnPropertyChanged(nameof(SelectedChat));
            }
        }

        public Search<ObservableCollection<Chat>> ChatSearch { get; }

        public RelayCommand SearchTextChangedCommand { get; set; }

        public RelayCommand ShowLeftMenuCommand { get; set; }

        private Chat _selectedChat;

        private readonly Dictionary<int, ChatPage> _chatPages = new Dictionary<int, ChatPage>();

        private readonly IConnectionSource<IChatSocket> _chatSockets;
        
        private readonly IUserResource _currentUser;
        
        private readonly Func<Chat, IChatResource> _chatFactory;

        public IndexViewModel(
            IUserResource currentUser,
            IConnectionSource<IChatSocket> chatSockets,
            Func<Chat, IChatResource> chatFactory
        ) : this(currentUser, chatSockets, chatFactory, new ChatSearch(new List<Chat>()))
        {
        }

        public IndexViewModel(
            IUserResource currentUser,
            IConnectionSource<IChatSocket> sockets,
            Func<Chat, IChatResource> chatFactory,
            Search<ObservableCollection<Chat>> chatSearch
        )
        {
            _currentUser = currentUser;
            _chatFactory = chatFactory;
            _chatSockets = sockets;
            ChatSearch = chatSearch;
            InitializeCommands();
        }

        public async Task LoadChats()
        {
            ChatSearch.AddItems(
                new ObservableCollection<Chat>(
                    await _currentUser.Chats(20)
                )
            );
        }

        public ChatPage ChatPage(Chat chat, User user)
        {
            var id = chat.Id;
            if (_chatPages.ContainsKey(id))
            {
                return _chatPages[id];
            }

            return _chatPages[id] = new ChatPage(
                chat,
                user,
                _chatSockets.New(),
                _chatFactory.Invoke(chat)
            );
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
