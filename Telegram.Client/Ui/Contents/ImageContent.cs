using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Media;
using Telegram.Client.Ui.Converters;
using Telegram.Client.Ui.Elements.Images;

namespace Telegram.Client.Ui.Contents
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
                new Uri(_uri, UriKind.Absolute)
            ),
            400,
            200
        ).VisualPresentation.Source;

        private readonly string _uri;

        public ImageContent(string uri)
        {
            _uri = uri;
        }
    }
}
