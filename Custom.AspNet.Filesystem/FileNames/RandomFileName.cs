namespace Custom.AspNet.Filesystem.FileNames
{
    public class RandomFileName : FileName
    {
        public override string Value(string extension)
        {
            return new RandomString().Value() + extension;
        }
    }
}