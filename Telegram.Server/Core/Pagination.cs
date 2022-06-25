using System;

namespace Telegram.Server.Core
{
    public class Pagination
    {
        private readonly int _count;

        private readonly int _offset;
        
        private readonly string _text;

        public Pagination(PaginationModel pagination) : this(pagination.Count, pagination.Offset, pagination.Text) { }

        public Pagination(int count, int offset, string text = "")
        {
            _count = count;
            _offset = offset;
            _text = text;
        }

        public int Count()
        {
            // -1 if need load all
            return Math.Max(_count, -1);
        }

        public int Offset()
        {
            return Math.Max(_offset, 0);
        }

        public string Text()
        {
            return _text ?? "";
        }
    }
}