namespace Custom.AspNet.Filesystem
{
    public interface IAspFile
    {
        string Save();

        void Remove();
    }
}