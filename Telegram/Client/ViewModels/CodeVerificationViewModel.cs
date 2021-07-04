using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Telegram.Api.Fake.Resources;
using Telegram.Api.Resources;
using Telegram.Core;
using Telegram.Core.Models;
using Telegram.Client.Pages;
using System.Collections.ObjectModel;
using Telegram.Client.Content;

namespace Telegram.Client.ViewModels
{
    class CodeVerificationViewModel : ViewModel
    {
        public string WrongCodeMessage 
        { 
            get => wrongCodeMessage;
            set
            {
                wrongCodeMessage = value;
                OnPropertyChanged(nameof(WrongCodeMessage));
            }
        }

        public string Title { get; }

        public Phone Phone { get; }

        public Code EnteredCode { get; } = new Code();

        public RelayCommand LoginCommand { get; set; }

        public RelayCommand GoToLoginCommand { get; set; }

        private string wrongCodeMessage = "";

        private readonly IVerificationResource verification;

        private readonly Navigation navigation;

        public CodeVerificationViewModel(Navigation navigation, Phone phone, string title)
        {
            Phone = phone;
            Title = title;
            EnteredCode.UserId = phone.OwnerId;
            EnteredCode.Value = "";

            verification = new FakeVerification();
            this.navigation = navigation;

            InitCommands();
        }

        private void InitCommands()
        {
            LoginCommand = new RelayCommand(o => In());
            GoToLoginCommand = new RelayCommand(o => GoToLogin());
        }

        private async void In()
        {
            WrongCodeMessage = "";
            if (await verification.CheckCode(EnteredCode))
            {
                var messages1 = new ObservableCollection<Message> { new Message { Content = new TextContent("Tor") }, new Message { Content = new TextContent("Message") } };
                var messages2 = new ObservableCollection<Message> { new Message { Content = new TextContent("Odin") }, new Message { Content = new TextContent("Adin") } };
                var chats = new List<Chat>
                {
                    new Chat { Description = "Fruits", Name = "Fruits", Messages = messages1 },
                    new Chat { Description = "Fuck - 1", Name = "Cars", Messages = messages2 },
                    new Chat { Description = "Fuck - 2", Name = "Limb", Messages = messages1 },
                };
                navigation.To(new Index());

                return;
            }

            WrongCodeMessage = "You wrote wrong code, try again.";
        }

        private void GoToLogin()
        {
            navigation.To(new Login());
        }
    }
}
