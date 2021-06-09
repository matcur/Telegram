using System;
using System.Collections.Generic;
using System.Data.Entity;
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
using Telegram.Db;
using Telegram.Db.Models;
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
        
        private readonly AppDb db;

        private readonly LoginViewModel viewModel;

        private readonly DbSet<DbPhone> phones;

        private readonly DbSet<DbUser> users;

        private readonly string telegramCodeDescription =
            "A code was sent via Telegram to your other"
            + Environment.NewLine
            + "devices, if you have any connect.";

        private readonly string phoneCodeDesctiption = "A code was sent to your phone.";

        public Login()
        {
            db = new AppDb();
            phones = db.Phones;
            users = db.Users;
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
            navigation.To("Start");
        }

        private void GoToVerification(object sender, RoutedEventArgs e)
        {
            var phone = viewModel.Phone;
            if (phones.Any(p => phone.Number == p.Number))
            {
                navigation.To(
                    new CodeVerification(
                        phone,
                        telegramCodeDescription
                    )
                );

                return;
            }

            navigation.To(
                new CodeVerification(
                    phone,
                    phoneCodeDesctiption
                )
            );
            
            var user = new DbUser 
            { 
                FirstName = "",
                LastName = "",
                Phone = new DbPhone(phone)
            };
            user.Codes.Add(new DbCode(new Code()));
            users.Add(user);
            db.SaveChanges();
        }
    }
}
