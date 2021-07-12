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
        private Chat selectedChat;

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

        public RelayCommand SearchTextChangedCommand { get; }

        public IndexViewModel(): this(new ChatSearch(new List<Chat>()))
        {

        }

        public IndexViewModel(Search<ObservableCollection<Chat>> chatSearch)
        {
            ChatSearch = chatSearch;
            SearchTextChangedCommand = new RelayCommand(
                text => OnSearchTextChanged(text)
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
