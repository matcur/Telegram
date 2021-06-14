namespace Telegram.Models
{
    public class Message : Model
    {
        public string Text { get; set; }

        public User Author { get; set; }
    }
}