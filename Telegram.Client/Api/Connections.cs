using System;
using System.Collections.Generic;
using System.Windows.Documents;

namespace Telegram.Client.Api
{
    public class Connections<T> : IConnectionSource<T>
    {
        public event Action<T> NewAdded = delegate {  };
        
        public IReadOnlyList<T> Pool => pool;

        private readonly List<T> pool = new List<T>();
        
        private readonly Func<T> factory;

        public Connections(Func<T> factory)
        {
            this.factory = factory;
        }

        public T New()
        {
            var connection = factory.Invoke();
            
            pool.Add(connection);
            NewAdded.Invoke(connection);

            return connection;
        }
    }
}