namespace Telegram.Server.Core
{
    public class PaginationModel
    {
        public int Offset { get; set; }

        public int Count { get; set; }

        public string Text { get; set; }
    }
}