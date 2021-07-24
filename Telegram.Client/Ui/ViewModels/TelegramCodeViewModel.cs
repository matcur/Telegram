using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.ViewModels
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
