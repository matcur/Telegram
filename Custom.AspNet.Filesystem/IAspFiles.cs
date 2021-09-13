using System.Collections.Generic;

namespace Custom.AspNet.Filesystem
{
    public interface IAspFiles
    {
        IEnumerable<string> Save();
    }
}