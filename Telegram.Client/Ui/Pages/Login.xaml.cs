using System;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.ViewModels;

namespace Telegram.Client.Ui.Pages
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
            "A code was sent via Telegram.Client to your other" +
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
            var vm = new CodeVerificationViewModel(
                phone,
                navigation,
                phoneTitle
            );

            navigation.To(
                new CodeVerification(vm)
            );

            var response = await users.Register(phone);
            var user = response.Result;
            vm.EnteredCode.UserId = user.Id;
            phone.OwnerId = user.Id;

            await verification.ByPhone(user.Phone);
        }

        private async Task GoToTelegramVerification(Phone phone)
        {
            navigation.To(
                new CodeVerification(
                    new CodeVerificationViewModel(
                        phone,
                        navigation,
                        telegramTitle
                    )    
                )
            );

            await verification.FromTelegram(phone);
        }
    }
}
