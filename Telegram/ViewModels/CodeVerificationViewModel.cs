using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Telegram.Api.Resources;
using Telegram.Core;
using Telegram.Models;
using Telegram.Pages;

namespace Telegram.ViewModels
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

        private readonly Verification verification;

        private readonly Navigation navigation;

        public CodeVerificationViewModel(Navigation navigation, Phone phone, string title)
        {
            Phone = phone;
            Title = title;
            EnteredCode.UserId = phone.OwnerId;
            EnteredCode.Value = "";

            this.verification = new Verification();
            this.navigation = navigation;

            InitCommands();
        }

        private void InitCommands()
        {
            LoginCommand = new RelayCommand(In);
            GoToLoginCommand = new RelayCommand(GoToLogin);
        }

        private async void In()
        {
            WrongCodeMessage = "";
            if (await verification.CheckCode(EnteredCode))
            {
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
