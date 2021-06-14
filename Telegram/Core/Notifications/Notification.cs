namespace Telegram.Core.Notifications
{
    public interface Notification
    {
        void Send(string message, string to);
    }
}