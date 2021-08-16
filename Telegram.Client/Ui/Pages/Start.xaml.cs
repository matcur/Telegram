using System.Windows;
using System.Windows.Controls;
using Telegram.Client.Api.Fake;
using Telegram.Client.Api.Fake.Auth;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Core;
using Telegram.Client.Ui.ViewModels;

namespace Telegram.Client.Ui.Pages
{
    /// <summary>
    /// Interaction logic for Start.xaml
    /// </summary>
    public partial class Start : Page
    {
        private  Navigation _navigation;

        public Start()
        {
            InitializeComponent();
            Loaded += delegate { _navigation = new Navigation(this); };
        }

        private void GoToLogin(object sender, RoutedEventArgs e)
        {
            var api = new FakeClient();
            var users = new FakeUsers(api);
            var verification = new FakeVerification(api);
            
            _navigation.To(
                new Login(
                    new LoginViewModel(
                        users,
                        new FakePhones(api),
                        verification
                    ),
                    verification,
                    users
                )
            );
        }
    }
}
