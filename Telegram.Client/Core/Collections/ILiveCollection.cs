using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;

namespace Telegram.Client.Core.Collections
{
    public interface ILiveCollection<T> : IList<T>, INotifyCollectionChanged, INotifyPropertyChanged
    {
        void InsertRange(int index, IEnumerable<T> collection);

        void AddRange(IEnumerable<T> collection);
    }
}