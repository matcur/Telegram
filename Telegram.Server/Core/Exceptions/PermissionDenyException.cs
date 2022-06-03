using System;

namespace Telegram.Server.Core.Exceptions
{
    public class PermissionDenyException : Exception
    {
        public PermissionDenyException(string reason) : base(reason) { }
    }
}