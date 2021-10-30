using System.Collections.Generic;

namespace Sherden.AspNet.Filesystem
{
    public interface IAspFiles
    {
        IEnumerable<string> Save();

        void Remove();
    }
}