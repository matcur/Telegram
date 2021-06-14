using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Telegram.Api;
using Telegram.Core;
using Telegram.Core.Notifications;
using Telegram.Models;
using Telegram.Pages.Verifications;
using Telegram.ViewModels;

namespace Telegram.Pages
{
    /// <summary>
    /// Interaction logic for Login.xaml
    /// </summary>
    public partial class Login : Page
    {
        private Navigation navigation;
        
        private readonly LoginViewModel viewModel;

        private readonly Phones phones;
        
        private readonly Users users;

        public Login()
        {
            users = new Users();
            phones = new Phones();
            viewModel = new LoginViewModel();
            DataContext = viewModel;
            InitializeComponent();
            Loaded += OnLoaded;
        }

        private void OnLoaded(object sender, RoutedEventArgs args)
        {
            navigation = new Navigation(this);
        }

        private void GoToStart(object sender, RoutedEventArgs e)
        {
            navigation.To("Start");
        }

        private void GoToVerification(object sender, RoutedEventArgs e)
        {
            var phone = viewModel.Phone;
            var code = new Code();
            if (phones.Any("Number", phone.Number))
            {
                new Verification(
                    navigation, 
                    phone,
                    new TelegramNotification(),
                    code,
                    "A code was sent via Telegram to your other"
                    + Environment.NewLine
                    + "devices, if you have any connect."
                ).Execute();
                
                return;
            }

            new Verification(
                navigation,
                phone,
                new SmsNotification(),
                code,
                "A code was sent to your phone."
            ).Execute();
        }
    }
}
