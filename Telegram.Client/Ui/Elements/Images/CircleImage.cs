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
                var halfWidth = image.Width / 2;
                var halfHeight = image.Height / 2;
                
                image.Clip = new EllipseGeometry(
                    new Point(halfWidth, halfHeight),
                    halfWidth,
                    halfHeight
                );

                return image;
            }
        }

        private readonly Image image;

        public CircleImage(Image image)
        {
            this.image = image;
        }

        public CircleImage(IImage image)
        {
            this.image = image.VisualPresentation;
        }
    }
}
