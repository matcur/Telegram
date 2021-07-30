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
        public event Action<Phone, VerificationType> Verificating = delegate {  };

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
            var response = await phones.Find(phone);
            if (response.Success)
            {
                Verificating.Invoke(
                    phone,
                    VerificationType.Telegram
                );
                await verification.FromTelegram(phone);
                
                return;
            }
            
            Verificating.Invoke(
                phone,
                VerificationType.Phone
            );
            await users.Register(phone);
            await verification.ByPhone(phone);
        }
    }
}
