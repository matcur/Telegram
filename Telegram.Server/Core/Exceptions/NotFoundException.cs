using System;

namespace Telegram.Server.Core.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string info) : base(info) {}
    }
}