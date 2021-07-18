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

namespace Telegram.Client.ViewModels
{
    public class CodeVerificationViewModel : ViewModel
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

        public Code EnteredCode { get; }

        public RelayCommand InCommand { get; set; }

        public RelayCommand GoToLoginCommand { get; set; }

        private string wrongCodeMessage = "";

        private readonly IVerificationResource verification;

        private readonly IUsersResource users;

        private readonly Navigation navigation;

        public CodeVerificationViewModel(Phone phone, Navigation pageNavigation, string title)
        {
            Title = title;
            Phone = phone;
            EnteredCode = new Code(phone);

            verification = new FakeVerification();
            users = new FakeUsers();
            navigation = pageNavigation;

            InitializeCommands();
        }

        private void InitializeCommands()
        {
            InCommand = new RelayCommand(o => In());
            GoToLoginCommand = new RelayCommand(o => GoToLogin());
        }

        private async void In()
        {
            WrongCodeMessage = "";
            if (await verification.CheckCode(EnteredCode) || true)
            {
                var response = await users.Find(Phone);
                navigation.To(new Index(response.Result, new FakeChats()));

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
