using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core;
using Telegram.Core.Models;
using Telegram.Core.Searching;

namespace Telegram.Client.ViewModels
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

        public IndexViewModel(): this(new ChatSearch(new List<Chat>()))
        {

        }

        public IndexViewModel(Search<ObservableCollection<Chat>> chatSearch)
        {
            ChatSearch = chatSearch;
            InitializeCommands();
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
