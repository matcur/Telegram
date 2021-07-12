using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telegram.Core.Models;

namespace Telegram.Api.Resources
{
    public interface IChatResource
    {
        Task<RequestResult<IEnumerable<Message>>> Messages(int offset, int count);
    }
}
