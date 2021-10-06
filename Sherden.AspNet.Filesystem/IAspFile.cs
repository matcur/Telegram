namespace Sherden.AspNet.Filesystem
{
    public interface IAspFile
    {
        string Save();

        void Remove();
    }
}