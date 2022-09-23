using System;
using System.Collections.Generic;
using System.Linq;

namespace Telegram.Server.Core.Dictionaries
{
    public class DeepDictionary<TKey, TDeepKey, TValue>
    {
        private readonly Dictionary<TKey, Dictionary<TDeepKey, TValue>> _dictionary =
            new Dictionary<TKey, Dictionary<TDeepKey, TValue>>();

        public void Put(TKey key, TDeepKey deepKey, TValue value)
        {
            lock (key)
            {
                lock (deepKey)
                {
                    if (!_dictionary.ContainsKey(key))
                    {
                        _dictionary[key] = new Dictionary<TDeepKey, TValue>();
                    }
            
                    _dictionary[key][deepKey] = value;
                }
            }
        }

        public bool Any(TKey key, Func<TValue, bool> predicate)
        {
            lock (key)
            {
                if (!_dictionary.ContainsKey(key))
                {
                    return false;
                }

                return _dictionary[key].Values.Any(predicate);
            }
        }
        
        public bool All(TKey key, Func<TValue, bool> predicate)
        {
            lock (key)
            {
                if (!_dictionary.ContainsKey(key))
                {
                    return true;
                }

                return _dictionary[key].Values.All(predicate);
            }
        }

        public void Remove(TKey key, TDeepKey deepKey)
        {
            lock (key)
            {
                lock (deepKey)
                {
                    if (!_dictionary.ContainsKey(key))
                    {
                        return;
                    }

                    _dictionary[key].Remove(deepKey);
                    if (_dictionary[key].Values.Count == 0)
                    {
                        _dictionary.Remove(key);
                    }
                }
            }
        }

        private void EnsureKeyExists<T>(Dictionary<string, T> dictionary, string key)
        {
            if (!dictionary.ContainsKey(key))
            {
                throw new KeyNotFoundException($"Value with key {key} is not found");
            }
        }
    }
}