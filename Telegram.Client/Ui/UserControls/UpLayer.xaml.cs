using System.Windows;
using System.Windows.Controls;

namespace Telegram.Client.Ui.UserControls
{
    /// <summary>
    /// Interaction logic for UpLayer.xaml
    /// </summary>
    public partial class UpLayer : UserControl
    {
        public UserControl LeftElement
        {
            get => _leftElement;
            set
            {
                _leftElement = value;
                LeftPart.Navigate(value);
                Show();
            }
        }

        public UserControl CenterElement
        {
            get => _centerElement;
            set
            {
                _centerElement = value;
                CenterPart.Navigate(value);
                Show();
            }
        }

        private UserControl _leftElement;

        private UserControl _centerElement;

        public UpLayer()
        {
            Visibility = Visibility.Hidden;
            InitializeComponent();
        }

        public void Show()
        {
            Visibility = Visibility.Visible;
        }

        public void Hide()
        {
            Visibility = Visibility.Hidden;
        }
    }
}
