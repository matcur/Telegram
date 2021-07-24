using Telegram.Core.Models;

namespace Telegram.Ui.ViewModels
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
