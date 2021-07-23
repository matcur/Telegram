using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Telegram.Client.Contents
{
    public interface IContent
    {
        int DisplayOrder { get; }

        string Description { get; }

        FrameworkElement VisualPresentation { get; }
    }
}
