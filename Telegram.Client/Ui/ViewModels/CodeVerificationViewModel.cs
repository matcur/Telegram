using System;
using System.Collections.Generic;
using System.Net;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Api.Auth;
using Telegram.Client.Api.Fake.Auth;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.Pages;

namespace Telegram.Client.Ui.ViewModels
{
    public class CodeVerificationViewModel : ViewModel
    {
        // Action get logged user and authorization token
        public event Action<User, string> Logged = delegate {  };
        
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

        public RelayCommand InCommand => new RelayCommand(o => In());

        private string wrongCodeMessage = "";
        
        private readonly IVerification verification;

        private readonly IUsersResource users;

        private readonly Dictionary<VerificationType, string> titles = new Dictionary<VerificationType, string>
        {
            {
                VerificationType.Telegram,
                "A code was sent via Telegram.Client to your other" +
                Environment.NewLine +
                "devices, if you have any connect."
            },
            {VerificationType.Phone, "A code was sent to your phone."}
        };

        public CodeVerificationViewModel(
            Phone phone,
            VerificationType type,
            IVerification verification,
            IUsersResource users
        )
        {
            Title = titles[type];
            Phone = phone;
            EnteredCode = new Code(phone);

            this.verification = verification;
            this.users = users;
        }

        private async void In()
        {
            WrongCodeMessage = "";
            if (await verification.CheckCode(EnteredCode))
            {
                var tokenTask = verification.AuthorizationToken(EnteredCode);
                var userTask = users.Find(Phone);

                var user = (await userTask).Result;
                var token = (await tokenTask).Result;
                
                Logged.Invoke(user, token);

                return;
            }

            WrongCodeMessage = "You wrote wrong code, try again.";
        }
    }
}
