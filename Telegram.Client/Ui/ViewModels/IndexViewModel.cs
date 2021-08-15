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
        
        private readonly IUserResource currentUser;
        
        private readonly Func<Chat, IChatResource> chatFactory;

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
            this.currentUser = currentUser;
            this.chatFactory = chatFactory;
            chatSockets = sockets;
            ChatSearch = chatSearch;
            InitializeCommands();
        }

        public async Task LoadChats()
        {
            ChatSearch.AddItems(
                new ObservableCollection<Chat>(
                    await currentUser.Chats(20)
                )
            );
        }

        public ChatPage ChatPage(Chat chat, User user)
        {
            var id = chat.Id;
            if (chatPages.ContainsKey(id))
            {
                return chatPages[id];
            }

            return chatPages[id] = new ChatPage(
                chat,
                user,
                chatSockets.New(),
                chatFactory.Invoke(chat)
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
