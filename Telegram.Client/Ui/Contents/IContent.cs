using System.Windows;

namespace Telegram.Ui.Contents
{
    public interface IContent
    {
        int DisplayOrder { get; }

        string Description { get; }

        FrameworkElement VisualPresentation { get; }
    }
}
