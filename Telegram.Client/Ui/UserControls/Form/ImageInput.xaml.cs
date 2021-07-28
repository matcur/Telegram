using System;
using System.ComponentModel;
using System.Drawing;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using UserControl = System.Windows.Controls.UserControl;

namespace Telegram.Client.Ui.UserControls.Form
{
    public partial class ImageInput : UserControl, IVisualInput, INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged = delegate{  };

        public event Action<string> ValueChanged = delegate{  };

        public string Error { get; set; }

        public string Value
        {
            get => value;
            private set
            {
                this.value = value;
                ValueChanged(value);
                Source = Bitmap(new Uri(value, UriKind.Absolute));
            }
        }

        public ImageSource Source
        {
            get => source;
            set
            {
                source = value;
                OnPropertyChanged();
            }
        }

        private string value;
        
        private ImageSource source;

        private ImageSource preview;

        public ImageInput()
        {
            preview = Bitmap(new Uri("pack://application:,,,/Ui/Resources/Images/new-chat-img.png"));
            Source = preview;
            DataContext = this;
            
            InitializeComponent();
        }

        private BitmapImage Bitmap(Uri uri)
        {
            var result = new BitmapImage();
            
            result.BeginInit();
            result.UriSource = uri;
            result.EndInit();

            return result;
        }

        private void OnClick(object sender, RoutedEventArgs e)
        {
            var dialog = new OpenFileDialog
            {
                Multiselect = false,
                Filter = "Image Files (JPG,PNG,GIF)|*.JPG;*.PNG"
            };
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                Value = dialog.FileName;
            }
        }

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}