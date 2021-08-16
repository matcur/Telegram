using System;
using System.Collections.Generic;
using System.Windows.Documents;

namespace Telegram.Client.Api
{
    public class Connections<T> : IConnectionSource<T>
    {
        public event Action<T> NewAdded = delegate {  };
        
        public IReadOnlyList<T> Pool => _pool;

        private readonly List<T> _pool = new List<T>();
        
        private readonly Func<T> _factory;

        public Connections(Func<T> factory)
        {
            _factory = factory;
        }

        public T New()
        {
            var connection = _factory.Invoke();
            
            _pool.Add(connection);
            NewAdded.Invoke(connection);

            return connection;
        }
    }
}