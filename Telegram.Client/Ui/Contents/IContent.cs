using System.Windows;

namespace Telegram.Client.Ui.Contents
{
    public interface IContent
    {
        int DisplayOrder { get; }

        string Description { get; }

        FrameworkElement VisualPresentation { get; }
    }
}
