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
using Telegram.Models;
using Telegram.ViewModels;

namespace Telegram.Pages
{
    /// <summary>
    /// Interaction logic for VerificationCode.xaml
    /// </summary>
    public partial class TelegramCode : Page
    {
        private TelegramCodeViewModel viewModel;

        public TelegramCode(Phone phone)
        {
            viewModel = new TelegramCodeViewModel(phone);
            DataContext = viewModel;
            InitializeComponent();
        }
    }
}
