using Telegram.Client.Core.Models;

namespace Telegram.Client.Ui.ViewModels
{
    public class LoginViewModel : ViewModel
    {
        public Phone Phone { get; set; } = new Phone { Number = "89519370404" };
    }
}
