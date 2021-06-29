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
        public Search<ObservableCollection<Chat>> ChatSearch { get; }

        public RelayCommand SearchTextChangedCommand { get; }

        public IndexViewModel(Search<ObservableCollection<Chat>> search)
        {
            ChatSearch = search;
            SearchTextChangedCommand = new RelayCommand(
                o => ChatSearch.Text = (string)o
            );
        }
    }
}
