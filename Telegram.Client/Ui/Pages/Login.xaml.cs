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
        private readonly IVerification _verification;
        
        private readonly IUsersResource _users;
        
        private Navigation _navigation;
        
        public Login(LoginViewModel viewModel, IVerification verification, IUsersResource users)
        {
            _verification = verification;
            _users = users;
            viewModel.Verificated += ToCodeVerification;
            DataContext = viewModel;
            InitializeComponent();
        }

        private void OnLoaded(object sender, RoutedEventArgs args)
        {
            _navigation = new Navigation(this);
        }

        private void ToCodeVerification(Phone phone, VerificationType type)
        {
            _navigation.To(
                new CodeVerification(
                    new CodeVerificationViewModel(
                        phone,
                        type,
                        _verification,
                        _users
                    ),
                    _navigation
                )
            );
        }

        private void GoToStart(object sender, RoutedEventArgs e)
        {
            _navigation.To(new Start());
        }
    }
}
