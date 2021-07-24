using System.Windows;
using System.Windows.Controls;

namespace Telegram.Ui.UserControls
{
    /// <summary>
    /// Interaction logic for UpLayer.xaml
    /// </summary>
    public partial class UpLayer : UserControl
    {
        public UserControl LeftElement
        {
            get => leftElement;
            set
            {
                leftElement = value;
                LeftPart.Navigate(value);
                Show();
            }
        }

        public UserControl CenterElement
        {
            get => centerElement;
            set
            {
                centerElement = value;
                CenterPart.Navigate(value);
                Show();
            }
        }

        private UserControl leftElement;

        private UserControl centerElement;

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
