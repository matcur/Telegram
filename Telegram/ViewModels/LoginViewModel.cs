using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.ViewModels
{
    public class LoginViewModel : ViewModel
    {
        public Phone Phone { get; set; } = new Phone();
    }
}
