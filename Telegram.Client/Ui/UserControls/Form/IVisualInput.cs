using System;

namespace Telegram.Ui.UserControls.Form
{
    public interface IVisualInput
    {
        event Action<string> ValueChanged;
        
        string Error { set; }
        
        string Value { get; }
    }
}