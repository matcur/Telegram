using System.Collections.Generic;
using System.Collections.ObjectModel;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Core.Searching
{
    public class ChatSearch : Search<ObservableCollection<Chat>>
    {
        public override ObservableCollection<Chat> Filtered { get; }

        private readonly List<Chat> _chats;

        public ChatSearch(IEnumerable<Chat> items)
        {
            _chats = new List<Chat>(items);
            Filtered = new ObservableCollection<Chat>(items);
            TextChanged += Update;
        }

        public override void AddItems(ObservableCollection<Chat> items)
        {
            _chats.AddRange(items);
            Update(_text);
        }

        private void Update(string text)
        {
            _text = text;
            Filtered.Clear();
            foreach (var chat in _chats)
            {
                if (chat.Name.Contains(text) || string.IsNullOrEmpty(text))
                {
                    Filtered.Add(chat);
                }
            }
        }
    }
}
