using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Client.Content;
using Telegram.Core.Models;

namespace Telegram.Client.DesignData
{
    public class DesignChat
    {
        public static DesignChat Chat => new DesignChat();

        public int Id => 1;

        public string Name => "Cinema";

        public string Description => "Virtual";

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

        public ObservableCollection<Message> Messages =>
            new ObservableCollection<Message>
            {
                new Message { Id = 1, Content = new TextContent("First message"), Author = Members[0] },
                new Message { Id = 2, Content = new TextContent("Second message"), Author = Members[1] },
                new Message { Id = 3, Content = new TextContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim nulla non erat convallis, ut egestas nulla lacinia. Cras sollicitudin aliquet lacinia. Proin lobortis suscipit pellentesque. Sed varius eu mauris quis pellentesque. Donec id urna massa. Sed suscipit, ipsum bibendum molestie pellentesque, ante magna lacinia urna, vitae placerat lectus velit ac purus. Vivamus egestas, felis in elementum cursus, odio elit volutpat libero, et tristique ipsum dolor ut arcu. Sed molestie."), Author = Members[0] },
            };

        public ObservableCollection<User> Members => 
            new ObservableCollection<User>
            {
                new User { Id = 1, FirstName = "Name", LastName = "Last-Name" },
                new User { Id = 2, FirstName = "Lorem", LastName = "Fuck" },
                new User { Id = 3, FirstName = "Jon", LastName = "Viliam" },
                new User { Id = 4, FirstName = "Json", LastName = "Centurion" },
                new User { Id = 5, FirstName = "Div", LastName = "Lirium" },
            };
    }
}
