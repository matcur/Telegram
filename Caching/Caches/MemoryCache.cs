using System;
using System.Collections.Generic;

namespace Caching.Caches
{
    public class MemoryCache<T> : ICache<T>
    {
        private static readonly Dictionary<string, T> _store =
            new Dictionary<string, T>();
        
        public T Value(Func<T> resolve, string key)
        {
            if (!_store.ContainsKey(key))
            {
                _store[key] = resolve.Invoke();
            }

            return _store[key];
        }
    }
}