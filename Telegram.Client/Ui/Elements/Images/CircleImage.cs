using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace Telegram.Client.Ui.Elements.Images
{
    public class CircleImage : IImage
    {
        public Image VisualPresentation
        {
            get
            {
                var halfWidth = _image.Width / 2;
                var halfHeight = _image.Height / 2;
                
                _image.Clip = new EllipseGeometry(
                    new Point(halfWidth, halfHeight),
                    halfWidth,
                    halfHeight
                );

                return _image;
            }
        }

        private readonly Image _image;

        public CircleImage(Image image)
        {
            _image = image;
        }

        public CircleImage(IImage image)
        {
            _image = image.VisualPresentation;
        }
    }
}
