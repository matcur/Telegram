﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Client.ViewModels
{
    public class LoginViewModel : ViewModel
    {
        public Phone Phone { get; set; } = new Phone { Number = "89519370404" };
    }
}
