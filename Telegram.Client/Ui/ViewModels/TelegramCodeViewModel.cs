using Telegram.Core.Models;

namespace Telegram.Ui.ViewModels
{
    public class TelegramCodeViewModel : ViewModel
    {
        public Phone Phone { get; }

        public string Code { get; set; }

        public TelegramCodeViewModel(Phone phone)
        {
            Phone = phone;
        }
    }
}
