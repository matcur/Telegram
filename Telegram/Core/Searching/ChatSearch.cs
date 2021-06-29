using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Core.Searching
{
    public class ChatSearch : Search<ObservableCollection<Chat>>
    {
        public override ObservableCollection<Chat> Filtered { get; }

        private readonly List<Chat> chats;

        public ChatSearch(IEnumerable<Chat> chats)
        {
            this.chats = new List<Chat>(chats);
            Filtered = new ObservableCollection<Chat>(chats);
            TextChanged += OnTextChanged;
        }

        private void OnTextChanged(string text)
        {
            Filtered.Clear();
            foreach (var chat in chats)
            {
                if (chat.Name.Contains(text) || string.IsNullOrEmpty(text))
                {
                    Filtered.Add(chat);
                }
            }
        }
    }
}
