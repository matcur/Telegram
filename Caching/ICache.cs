using System;

namespace Caching
{
    public interface ICache<T>
    {
        T Value(Func<T> resolve, string key);
        
        
    }
}