using Telegram.Core;
using Telegram.Core.Notifications;
using Telegram.Models;

namespace Telegram.Pages.Verifications
{
    public class Verification
    {
        private readonly Navigation navigation;
        
        private readonly Phone phone;
        
        private readonly Notification notification;
        
        private readonly Code code;
        
        private readonly string description;

        public Verification(Navigation navigation, Phone phone, Notification notification, Code code, string description)
        {
            this.navigation = navigation;
            this.phone = phone;
            this.notification = notification;
            this.code = code;
            this.description = description;
        }
        
        public void Execute()
        {
            navigation.To(
                new CodeVerification(
                    phone,
                    description
                )
            );
            notification.Send(
                $"Your code is {code.Value}, ignore that, if didn't try enter.",
                phone.Number
            );
        }
    }
}