using System;

namespace Sherden.Caching
{
    public interface ICache<T>
    {
        T Value(Func<T> resolve, string key);
        
        
    }
}