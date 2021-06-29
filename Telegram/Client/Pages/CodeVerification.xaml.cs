using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Telegram.Core;
using Telegram.Core.Models;
using Telegram.Client.ViewModels;

namespace Telegram.Client.Pages
{
    /// <summary>
    /// Interaction logic for CodeVerification.xaml
    /// </summary>
    public partial class CodeVerification : Page
    {
        private readonly CodeVerificationViewModel viewModel;

        public CodeVerification(Navigation navigation, Phone phone, string title)
        {
            viewModel = new CodeVerificationViewModel(navigation, phone, title);
            DataContext = viewModel;
            InitializeComponent();
        }
    }
}
