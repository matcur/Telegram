using System;
using System.Windows.Controls;
using System.Windows.Media.Imaging;

namespace Telegram.Ui.Elements.Images
{
    public class InitializedImage : IImage
    {
        private readonly Uri uri;

        public InitializedImage(Uri uri)
        {
            this.uri = uri;
        }

        public Image VisualPresentation
        {
            get
            {
                var result = new Image();
                var bitmap = new BitmapImage();
                
                bitmap.BeginInit();
                bitmap.UriSource = uri;
                bitmap.EndInit();

                result.Source = bitmap;

                return result;
            }
        }
    }
}