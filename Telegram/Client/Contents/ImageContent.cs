using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace Telegram.Client.Contents
{
    public class ImageContent : IContent
    {
        public int DisplayOrder => 800;

        public string Description => "Image";

        public FrameworkElement VizualPresentation
        {
            get
            {
                var result = new Image();
                var bitmap = new BitmapImage();
                
                bitmap.BeginInit();
                bitmap.UriSource = new Uri(uri, UriKind.Absolute);
                bitmap.EndInit();

                result.Source = bitmap;

                return result;
            }
        }

        private readonly string uri;

        public ImageContent(string uri)
        {
            this.uri = uri;
        }
    }
}
