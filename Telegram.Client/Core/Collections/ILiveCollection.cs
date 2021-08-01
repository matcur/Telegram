using System.Collections.Generic;
using System.Collections.Specialized;

namespace Telegram.Client.Core.Collections
{
    public interface ILiveCollection<T> : IList<T>, INotifyCollectionChanged
    {
        void InsertRange(int index, IEnumerable<T> collection);

        void AddRange(IEnumerable<T> collection);
    }
}