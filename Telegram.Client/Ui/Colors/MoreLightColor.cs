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
                var color = this.color.Value;

                var lightColor = ControlPaint.Light(
                    System.Drawing.Color.FromArgb(
                        color.A,
                        color.R,
                        color.G,
                        color.B
                    ), coefficient
                );

                return Color.FromArgb(
                    lightColor.A,
                    lightColor.R,
                    lightColor.G,
                    lightColor.B
                );
            }
        }

        private readonly IColor color;
        
        private readonly float coefficient;

        public MoreLightColor(IColor color, float coefficient = 0.2f)
        {
            this.color = color;
            this.coefficient = coefficient;
        }
    }
}