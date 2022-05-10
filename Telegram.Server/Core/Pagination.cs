using System;

namespace Telegram.Server.Core
{
    public class Pagination
    {
        private readonly int _count;

        private readonly int _offset;

        public Pagination(int count, int offset)
        {
            _count = count;
            _offset = offset;
        }

        public int Count()
        {
            return Math.Max(_count, 0);
        }

        public int Offset()
        {
            return Math.Max(_offset, 0);
        }
    }
}