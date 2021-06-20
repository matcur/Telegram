﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;

namespace Telegram.Core
{
    public class Navigation
    {
        private readonly NavigationService service;

        public Navigation(DependencyObject @object)
        {
            service = NavigationService.GetNavigationService(@object);
        }

        public void To(Page page)
        {
            service.Navigate(page);
        }
    }
}