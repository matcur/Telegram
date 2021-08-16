namespace Telegram.Client.Core.Models
{
    public class Phone : Model
    {
        private string _number;

        public int OwnerId { get; set; }

        public string Number
        {
            get => _number;
            set
            {
                _number = value;
                OnPropertyChanged(nameof(Number));
            }
        }
    }
}