using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.ViewModels
{
    public class PhoneCodeViewModel : ViewModel
    {
        public Phone Phone { get; }

        public string Code { get; set; }

        public PhoneCodeViewModel(Phone phone)
        {
            Phone = phone;
        }
    }
}
