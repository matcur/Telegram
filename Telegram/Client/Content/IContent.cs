using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Telegram.Client.Content
{
    public interface IContent
    {
        int DisplayOrder { get; }

        string Description { get; }

        FrameworkElement VizualPresentation { get; }
    }
}
