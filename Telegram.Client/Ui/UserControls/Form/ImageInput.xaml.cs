using System;
using System.Windows;
using System.Windows.Forms;
using UserControl = System.Windows.Controls.UserControl;

namespace Telegram.Client.Ui.UserControls.Form
{
    public partial class ImageInput : UserControl, IVisualInput
    {
        public event Action<string> ValueChanged = delegate{  };

        public string Error { get; set; }

        public string Value
        {
            get => value;
            private set
            {
                this.value = value;
                ValueChanged(value);
            }
        }
        
        private string value;

        public ImageInput()
        {
            InitializeComponent();
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
    }
}