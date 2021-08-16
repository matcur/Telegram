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
            get => _value;
            private set
            {
                _value = value;
                ValueChanged(value);
                Source = Bitmap(new Uri(value, UriKind.Absolute));
            }
        }

        public ImageSource Source
        {
            get => _source;
            set
            {
                _source = value;
                OnPropertyChanged();
            }
        }

        private string _value;
        
        private ImageSource _source;

        private readonly ImageSource _preview;
        
        private readonly FileDialog _dialog;

        public ImageInput()
        {
            _preview = Bitmap(new Uri("pack://application:,,,/Ui/Resources/Images/new-chat-img.png"));
            _dialog = new OpenFileDialog
            {
                Multiselect = false,
                Filter = "Image Files (JPG,PNG,GIF)|*.JPG;*.PNG"
            };
            Source = _preview;
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
            if (_dialog.ShowDialog() == DialogResult.OK)
            {
                Value = _dialog.FileName;
            }
        }

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}