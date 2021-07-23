using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using Telegram.Client.Converters;
using Telegram.Client.Elements.Images;

namespace Telegram.Client.Contents
{
    public class ImageContent : IContent
    {
        public int DisplayOrder => 800;

        public string Description => "Image";

        public FrameworkElement VisualPresentation
        {
            get
            {
                var image = new Image();
                
                image.SetBinding(Image.SourceProperty, Binding);
                image.HorizontalAlignment = HorizontalAlignment.Left;

                return image;
            }
        }

        private Binding Binding => new Binding
        {
            Converter = new ElementInitialization(
                () => Source
            ),
            IsAsync = true,
        };

        private ImageSource Source => new ScaledImage(
            new InitializedImage(
                new Uri(uri, UriKind.Absolute)
            ),
            400,
            200
        ).VisualPresentation.Source;

        private readonly string uri;

        public ImageContent(string uri)
        {
            this.uri = uri;
        }
    }
}
