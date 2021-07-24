using System.Windows.Controls;
using Telegram.Ui.ViewModels;

namespace Telegram.Ui.Pages
{
    /// <summary>
    /// Interaction logic for CodeVerification.xaml
    /// </summary>
    public partial class CodeVerification : Page
    {
        private readonly CodeVerificationViewModel viewModel;

        public CodeVerification(CodeVerificationViewModel vm)
        {
            viewModel = vm;
            DataContext = viewModel;
            InitializeComponent();
        }
    }
}
