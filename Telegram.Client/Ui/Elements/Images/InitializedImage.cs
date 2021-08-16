using System;
using System.Windows.Controls;
using System.Windows.Media.Imaging;

namespace Telegram.Client.Ui.Elements.Images
{
    public class InitializedImage : IImage
    {
        private readonly Uri _uri;

        public InitializedImage(Uri uri)
        {
            _uri = uri;
        }

        public Image VisualPresentation
        {
            get
            {
                var result = new Image();
                var bitmap = new BitmapImage();
                
                bitmap.BeginInit();
                bitmap.UriSource = _uri;
                bitmap.EndInit();

                result.Source = bitmap;

                return result;
            }
        }
    }
}