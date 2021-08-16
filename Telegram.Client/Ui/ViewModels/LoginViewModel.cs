using System;
using System.Threading.Tasks;
using Telegram.Client.Api.Auth;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.ViewModels
{
    public class LoginViewModel : ViewModel
    {
        public event Action<Phone, VerificationType> Verificated = delegate {  };

        public RelayCommand VerificationCommand => 
            new RelayCommand(o => Verify(Phone));
        
        public Phone Phone { get; } = new Phone { Number = "89519370404" };

        private readonly IPhonesResource _phones;
        
        private readonly IUsersResource _users;

        private readonly IVerification _verification;

        public LoginViewModel(IUsersResource users, IPhonesResource phones, IVerification verification)
        {
            _users = users;
            _phones = phones;
            _verification = verification;
        }

        private async void Verify(Phone phone)
        {
            var phoneResponse = await _phones.Find(phone);
            if (phoneResponse.Success)
            {
                Verificated.Invoke(
                    phoneResponse.Result,
                    VerificationType.Telegram
                );
                await _verification.FromTelegram(phone);
                
                return;
            }

            var userResponse = await _users.Register(phone);
            Verificated.Invoke(
                userResponse.Result.Phone,
                VerificationType.Phone
            );
            await _verification.ByPhone(phone);
        }
    }
}
