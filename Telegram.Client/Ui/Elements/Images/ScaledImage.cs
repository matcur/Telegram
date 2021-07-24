using System.Windows.Controls;

namespace Telegram.Ui.Elements.Images
{
    public class ScaledImage : IImage
    {
        public Image VisualPresentation
        {
            get
            {
                var height = image.Height;
                if (height > maxHeight)
                {
                    CastToHeight(height);
                }

                var width = image.Width;
                if (width > maxWidth)
                {
                    CastToWidth(width);
                }

                return image;
            }
        }

        private readonly double maxWidth;
        
        private readonly double maxHeight;

        private readonly Image image;

        public ScaledImage(IImage image, double maxWidth, double maxHeight)
        {
            this.image = image.VisualPresentation;
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
        }

        private void CastToWidth(double width)
        {
            image.Height *= width / maxWidth;
            image.Width = maxWidth;
        }

        private void CastToHeight(double height)
        {
            image.Width *= height / maxHeight;
            image.Height = maxHeight;
        }
    }
}