using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Data;
using System.Runtime.CompilerServices;
using Telegram.Client.Annotations;
using Telegram.Client.Core.Models;

namespace Telegram.Client.Core.Collections
{
    public class LiveCollection<T> : ILiveCollection<T>
    {
        public event NotifyCollectionChangedEventHandler CollectionChanged = delegate{  };
        
        public event PropertyChangedEventHandler PropertyChanged = delegate {  };
        
        public T this[int index]
        {
            get => items[index];
            set => Insert(index, value);
        }

        public int Count => items.Count;

        public bool IsReadOnly => false;

        private readonly List<T> items;
        
        public LiveCollection(): this(new List<T>()) {  }

        public LiveCollection(IEnumerable<T> items): this(new List<T>(items)) {  }
        
        private LiveCollection(List<T> items)
        {
            this.items = items;
        }

        public void Add(T item)
        {
            items.Add(item);
            FireCollectionChanged(
                NotifyCollectionChangedAction.Add,
                item,
                items.Count - 1
            );
            OnPropertyChanged(nameof(Count));
        }

        public void AddRange(IEnumerable<T> collection)
        {
            var count = Count - 1;
            items.AddRange(collection);
            FireCollectionChanged(
                NotifyCollectionChangedAction.Add,
                new List<T>(collection),
                count
            );
            OnPropertyChanged(nameof(Count));
        }

        public void Clear()
        {
            items.Clear();
            FireCollectionChanged(
                NotifyCollectionChangedAction.Reset,
                items,
                0
            );
            OnPropertyChanged(nameof(Count));
        }

        public bool Contains(T item)
        {
            return items.Contains(item);
        }

        public void CopyTo(T[] array, int arrayIndex)
        {
            items.CopyTo(array, arrayIndex);
        }

        public bool Remove(T item)
        {
            var removed = items.Remove(item);
            if (removed)
            {
                FireCollectionChanged(
                    NotifyCollectionChangedAction.Remove,
                    item    
                );
                OnPropertyChanged(nameof(Count));
            }

            return removed;
        }
        
        public int IndexOf(T item)
        {
            return items.IndexOf(item);
        }

        public void Insert(int index, T item)
        {
            items.Insert(index, item);

            FireCollectionChanged(
                NotifyCollectionChangedAction.Add,
                item,
                index    
            );
            OnPropertyChanged(nameof(Count));
        }

        public void InsertRange(int index, IEnumerable<T> collection)
        {
            var list = new List<T>(collection);

            items.InsertRange(index, collection);
            
            FireCollectionChanged(
                NotifyCollectionChangedAction.Add,
                list,
                index
            );
            OnPropertyChanged(nameof(Count));
        }

        public void RemoveAt(int index)
        {
            var removed = items[index];
            
            items.RemoveAt(index);
            
            FireCollectionChanged(
                NotifyCollectionChangedAction.Remove,
                removed,
                index    
            );
            FireCollectionChanged(
                NotifyCollectionChangedAction.Move,
                AfterItems(index + 1),
                index + 1
            );
            OnPropertyChanged(nameof(Count));
        }
        
        public IEnumerator<T> GetEnumerator()
        {
            return items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        private List<T> AfterItems(int index)
        {
            var result = new List<T>();
            for (var i = index + 1; i < items.Count; i++)
            {
                result.Add(items[i]);
            }

            return result;
        }
        
        private void FireCollectionChanged(NotifyCollectionChangedAction action, T item)
        {
            CollectionChanged.Invoke(
                this,
                new NotifyCollectionChangedEventArgs(
                    action,
                    item
                )
            );
        }
        
        private void FireCollectionChanged(NotifyCollectionChangedAction action, T item, int index)
        {
            CollectionChanged.Invoke(
                this,
                new NotifyCollectionChangedEventArgs(
                    action,
                    item,
                    index
                )
            );
        }
        
        private void FireCollectionChanged(NotifyCollectionChangedAction action, IList items, int index)
        {
            CollectionChanged.Invoke(
                this,
                new NotifyCollectionChangedEventArgs(
                    action,
                    items,
                    index
                )
            );
        }

        [NotifyPropertyChangedInvocator]
        private void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}