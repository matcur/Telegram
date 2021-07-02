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

        public IndexViewModel(Search<ObservableCollection<Chat>> search)
        {
            ChatSearch = search;
            SearchTextChangedCommand = new RelayCommand(
                text => ChatSearch.Text = (string)text
            );
            selectedChat = search.Filtered[0];
        }
    }
}
