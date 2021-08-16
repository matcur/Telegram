using System.Windows.Forms;
using System.Windows.Media;

namespace Telegram.Client.Ui.Colors
{
    public class MoreLightColor : IColor
    {
        public Color Value
        {
            get
            {
                var color = _color.Value;

                var lightColor = ControlPaint.Light(
                    System.Drawing.Color.FromArgb(
                        color.A,
                        color.R,
                        color.G,
                        color.B
                    ), _coefficient
                );

                return Color.FromArgb(
                    lightColor.A,
                    lightColor.R,
                    lightColor.G,
                    lightColor.B
                );
            }
        }

        private readonly IColor _color;
        
        private readonly float _coefficient;

        public MoreLightColor(IColor color, float coefficient = 0.2f)
        {
            _color = color;
            _coefficient = coefficient;
        }
    }
}