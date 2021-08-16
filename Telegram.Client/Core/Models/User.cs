using System.Collections.Generic;
using System.Windows.Controls;

namespace Telegram.Client.Core.Models
{
    public class User : Model
    {
        public static readonly User Nobody = new User
        {
            Id = -1,
        };
        
        public int Id { get; set; }

        public string FirstName
        {
            get => _firstName;
            set
            {
                _firstName = value;
                OnPropertyChanged(nameof(FirstName));
                OnPropertyChanged(nameof(FullName));
            }
        }

        public string LastName
        {
            get => _lastName;
            set
            {
                _lastName = value;
                OnPropertyChanged(nameof(LastName));
                OnPropertyChanged(nameof(FullName));
            }
        }

        public string FullName => $"{FirstName} {LastName}";

        public string AvatarUrl { get; set; }

        public Phone Phone
        {
            get => _phone;
            set
            {
                _phone = value;
                OnPropertyChanged(nameof(Phone));
            }
        }

        public List<Code> Codes { get; set; }

        private string _firstName;

        private string _lastName;

        private Phone _phone;
    }
}
