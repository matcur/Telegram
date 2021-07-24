using System;
using System.Windows.Input;

namespace Telegram.Client.Core
{
    public class RelayCommand : ICommand
    {
        public event EventHandler CanExecuteChanged = delegate { };

        private readonly Action<object> execute;

        private readonly Func<bool> canExecute;

        public RelayCommand(Action<object> execute, Func<bool> canExecute = null)
        {
            this.execute = execute;
            this.canExecute = canExecute;
        }

        public bool CanExecute(object parameter)
        {
            return canExecute == null || canExecute();
        }

        public void Execute(object parameter = default)
        {
            execute(parameter);
        }
    }
}
