using System;
using System.Collections;
using System.Collections.Generic;

namespace Telegram.Client.Core.Extensions
{
    public static class ListExtension
    {
        public static T Last<T>(this IList<T> list)
        {
            var count = list.Count;
            if (count == 0)
            {
                throw new ArgumentOutOfRangeException();
            }

            return list[count - 1];
        }
        
        public static object Last(this IList list)
        {
            var count = list.Count;
            if (count == 0)
            {
                throw new ArgumentOutOfRangeException();
            }

            return list[count - 1];
        }
    }
}