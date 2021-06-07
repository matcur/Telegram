using System.Windows;

namespace Telegram.Models
{
    public class Phone : Model
    {
        private string number;

        public string Number 
        { 
            get => number;
            set
            {
                number = value;
                OnPropertyChanged(nameof(Number));
            } 
        }
    }
}