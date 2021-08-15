using System.Net.Http;
using System.Windows.Controls;
using Telegram.Client.Api.Auth;
using Telegram.Client.Api.Fake;
using Telegram.Client.Api.Fake.Resources;
using Telegram.Client.Api.Resources;
using Telegram.Client.Core;
using Telegram.Client.Core.Models;
using Telegram.Client.Ui.ViewModels;

namespace Telegram.Client.Ui.Pages
{
    /// <summary>
    /// Interaction logic for CodeVerification.xaml
    /// </summary>
    public partial class CodeVerification : Page
    {
        private readonly CodeVerificationViewModel viewModel;
        
        private readonly Navigation navigation;

        public CodeVerification(CodeVerificationViewModel viewModel, Navigation navigation)
        {
            this.viewModel = viewModel;
            this.navigation = navigation;
            this.viewModel.Logged += ToIndex;
            DataContext = this.viewModel;
            InitializeComponent();
        }

        private void ToIndex(User user, string authorizationToken)
        {
            var api = new FakeClient(
                new HttpClient
                {
                    DefaultRequestHeaders = {{"Authorization", $"Bearer {authorizationToken}"}}
                }
            );
            
            navigation.To(
                new Index(
                    user,
                    new FakeUser(user, api),
                    new FakeChats(api),
                    chat => new FakeChat(chat, api)
                )
            );
        }
    }
}
