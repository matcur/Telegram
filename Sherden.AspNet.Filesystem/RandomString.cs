using System;
using System.Text;

namespace Sherden.AspNet.Filesystem
{
    public class RandomString
    {
        public string Value()
        {
            return Convert.ToBase64String(
               Encoding.UTF8.GetBytes(
                   new Random().Next().ToString()
               )
           );
        }
    }
}