﻿using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
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
            navigation.To(new Start());
        }

        private async void GoToVerification(object sender, RoutedEventArgs e)
        {
            var response = await phones.Find(viewModel.Phone);
            if (response.Success)
            {
                await GoToTelegramVerification(response.Result);

                return;
            }

            await GoToPhoneVerification(viewModel.Phone);
        }

        private async Task GoToPhoneVerification(Phone phone)
        {
            var user = await users.Register(phone);
            
            navigation.To(
                new CodeVerification(navigation, user.Phone, phoneTitle)
            );
         
            await verification.ByPhone(user.Phone);
        }

        private async Task GoToTelegramVerification(Phone phone)
        {
            navigation.To(
                new CodeVerification(navigation, phone, telegramTitle)
            );

            await verification.FromTelegram(phone);
        }
    }
}