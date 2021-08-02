using System;
using System.Collections.Generic;

namespace Telegram.Client.Api
{
    public interface IConnectionSource<T>
    {
        event Action<T> NewAdded;
        
        IReadOnlyList<T> Pool { get; }

        T New();
    }
}