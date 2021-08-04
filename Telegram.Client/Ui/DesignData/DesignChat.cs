﻿using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Telegram.Client.Core.Collections;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.DesignData
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

        public ILiveCollection<Message> UnreadMessages => new LiveCollection<Message>(Messages); 

        public ObservableCollection<Message> Messages
        {
            get
            {
                var textType = ContentType.Text;

                return new ObservableCollection<Message>
                {
                    new Message
                    { 
                        Content = new List<Core.Models.Content>{ new Core.Models.Content { Value = "First Message", Type = textType } }, 
                        Author = Members[0] 
                    },
                    new Message
                    {
                        Content = new List<Core.Models.Content>{ new Core.Models.Content { Value = "Second message", Type = textType } },
                        Author = Members[1] 
                    },
                    new Message
                    { 
                        Content = new List<Core.Models.Content>{ new Core.Models.Content { Value = "Lorem ipsum", Type = textType } }, 
                        Author = Members[0] 
                    },
                };
            }
        }

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
