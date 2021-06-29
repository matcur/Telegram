using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telegram.Core.Models
{
    public class Chat : Model
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Message LastMessage
        {
            get
            {
                if (Messages.Count == 0)
                {
                    return Message.Empty;
                }

                return Messages.Last();
            }
        }

        public ObservableCollection<Message> Messages { get; set; } = new ObservableCollection<Message>();

        public ObservableCollection<User> Members { get; set; } = new ObservableCollection<User>();

        public Chat()
        {
            Messages.CollectionChanged += delegate { OnPropertyChanged(nameof(LastMessage)); };
        }
    }
}
