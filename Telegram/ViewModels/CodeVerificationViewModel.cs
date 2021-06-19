using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Models;

namespace Telegram.ViewModels
{
    class CodeVerificationViewModel : ViewModel
    {
        public string EnteredCode { get; set; }

        public Phone Phone { get; }

        public string Title { get; }

        public CodeVerificationViewModel(Phone phone, string title)
        {
            Phone = phone;
            Title = title;
        }
    }
}
