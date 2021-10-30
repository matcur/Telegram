using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Sherden.AspNet.Filesystem
{
    public class NullFormFile : IFormFile
    {
        public string ContentType => "";

        public string ContentDisposition => "";

        public IHeaderDictionary Headers { get; } = new HeaderDictionary();

        public long Length => 0;

        public string Name => "";

        public string FileName => "";

        public Stream OpenReadStream()
        {
            return Stream.Null;
        }

        public void CopyTo(Stream target)
        {
            
        }

        public Task CopyToAsync(Stream target, CancellationToken cancellationToken = new CancellationToken())
        {
            return Task.CompletedTask;
        }
    }
}