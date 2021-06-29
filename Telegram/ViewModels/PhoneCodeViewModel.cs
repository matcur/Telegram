using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.ViewModels
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
