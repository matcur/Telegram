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

        private readonly IPhonesResource phones;
        
        private readonly IUsersResource users;

        private readonly IVerification verification;

        public LoginViewModel(IUsersResource users, IPhonesResource phones, IVerification verification)
        {
            this.users = users;
            this.phones = phones;
            this.verification = verification;
        }

        private async void Verify(Phone phone)
        {
            var phoneResponse = await phones.Find(phone);
            if (phoneResponse.Success)
            {
                Verificated.Invoke(
                    phoneResponse.Result,
                    VerificationType.Telegram
                );
                await verification.FromTelegram(phone);
                
                return;
            }

            var userResponse = await users.Register(phone);
            Verificated.Invoke(
                userResponse.Result.Phone,
                VerificationType.Phone
            );
            await verification.ByPhone(phone);
        }
    }
}
