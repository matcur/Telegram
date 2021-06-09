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
        public string Description { get; }

        public string EnteredCode { get; set; }

        public Phone Phone { get; }

        public CodeVerificationViewModel(Phone phone, string desctiption)
        {
            Phone = phone;
            Description = desctiption;
        }
    }
}
