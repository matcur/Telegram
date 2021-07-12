using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using Telegram.Api.Fake.Resources;
using Telegram.Api.Resources;
using Telegram.Core;
using Telegram.Core.Models;
using Telegram.Client.ViewModels;

namespace Telegram.Client.Pages
{
    /// <summary>
    /// Interaction logic for Login.xaml
    /// </summary>
    public partial class Login : Page
    {
        private Navigation navigation;
        
        private readonly LoginViewModel viewModel;

        private readonly IPhonesResource phones;

        private readonly IUsersResource users;

        private readonly IVerificationResource verification;

        private readonly string telegramTitle =
            "A code was sent via Telegram to your other" +
            Environment.NewLine +
            "devices, if you have any connect.";

        private readonly string phoneTitle = "A code was sent to your phone.";

        public Login()
        {
            phones = new FakePhones();
            users = new FakeUsers();
            verification = new FakeVerification();
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
            var response = await users.Register(phone);
            var user = response.Result;

            navigation.To(
                new CodeVerification(
                    new CodeVerificationViewModel(
                        user,
                        navigation,
                        phoneTitle
                    )    
                )
            );
         
            Task.Factory.StartNew(() => verification.ByPhone(user.Phone));
        }

        private async Task GoToTelegramVerification(Phone phone)
        {
            var response = await users.Find(phone);
            var user = response.Result;
            
            navigation.To(
                new CodeVerification(
                    new CodeVerificationViewModel(
                        user,
                        navigation,
                        telegramTitle
                    )    
                )
            );

            Task.Factory.StartNew(() => verification.FromTelegram(phone));
        }
    }
}
