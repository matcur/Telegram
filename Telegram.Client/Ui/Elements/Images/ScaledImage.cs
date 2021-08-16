using System.Windows.Controls;

namespace Telegram.Client.Ui.Elements.Images
{
    public class ScaledImage : IImage
    {
        public Image VisualPresentation
        {
            get
            {
                var height = _image.Height;
                if (height > _maxHeight)
                {
                    CastToHeight(height);
                }

                var width = _image.Width;
                if (width > _maxWidth)
                {
                    CastToWidth(width);
                }

                return _image;
            }
        }

        private readonly double _maxWidth;
        
        private readonly double _maxHeight;

        private readonly Image _image;

        public ScaledImage(IImage image, double maxWidth, double maxHeight)
        {
            _image = image.VisualPresentation;
            _maxWidth = maxWidth;
            _maxHeight = maxHeight;
        }

        private void CastToWidth(double width)
        {
            _image.Height *= width / _maxWidth;
            _image.Width = _maxWidth;
        }

        private void CastToHeight(double height)
        {
            _image.Width *= height / _maxHeight;
            _image.Height = _maxHeight;
        }
    }
}