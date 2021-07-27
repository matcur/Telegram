using System.Collections.Generic;

namespace Telegram.Client.Core.Models
{
    public class User : Model
    {
        public int Id { get; set; }

        public string FirstName
        {
            get => firstName;
            set
            {
                firstName = value;
                OnPropertyChanged(nameof(FirstName));
                OnPropertyChanged(nameof(FullName));
            }
        }

        public string LastName
        {
            get => lastName;
            set
            {
                lastName = value;
                OnPropertyChanged(nameof(LastName));
                OnPropertyChanged(nameof(FullName));
            }
        }

        public string FullName => $"{FirstName} {LastName}";

        public string AvatarUrl { get; set; }

        public Phone Phone
        {
            get => phone;
            set
            {
                phone = value;
                OnPropertyChanged(nameof(Phone));
            }
        }

        public List<Code> Codes { get; set; }

        private string firstName;

        private string lastName;

        private Phone phone;
    }
}
