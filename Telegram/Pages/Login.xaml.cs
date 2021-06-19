using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using Telegram.Api.Resources;
using Telegram.Core;
using Telegram.Models;
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

        private readonly Verification verification;

        private readonly string telegramTitle =
            "A code was sent via Telegram to your other" +
            Environment.NewLine +
            "devices, if you have any connect.";

        private readonly string phoneTitle = "A code was sent to your phone.";

        public Login()
        {
            phones = new Phones();
            users = new Users();
            verification = new Verification();
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

        private async void GoToVerification(object sender, RoutedEventArgs e)
        {
            var phone = viewModel.Phone;
            if (await phones.Exists(phone.Number))
            {
                navigation.To(
                    new CodeVerification(phone, telegramTitle)
                );
                await verification.FromTelegram(phone);
                
                return;
            }

            navigation.To(
                new CodeVerification(phone, phoneTitle)
            );

            var user = await users.Register(phone);
            var result = await verification.ByPhone(user.Phone);
        }
    }
}
