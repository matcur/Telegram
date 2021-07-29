using System;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Api.Auth;
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
        
        public Login(LoginViewModel viewModel)
        {
            viewModel.Verificating += ToCodeVerification;
            DataContext = viewModel;
            InitializeComponent();
        }

        private void OnLoaded(object sender, RoutedEventArgs args)
        {
            navigation = new Navigation(this);
        }

        private void ToCodeVerification(Phone phone, VerificationType type)
        {
            navigation.To(
                new CodeVerification(
                    new CodeVerificationViewModel(
                        phone,
                        type
                    ),
                    navigation
                )
            );
        }

        private void GoToStart(object sender, RoutedEventArgs e)
        {
            navigation.To(new Start());
        }
    }
}
