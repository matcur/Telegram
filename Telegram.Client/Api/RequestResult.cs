namespace Telegram.Client.Api
{
    public class RequestResult<T>
    {
        public bool Success { get; set; }

        public string ErrorMessage { get; set; }

        public T Result { get; set; }
    }

    public class RequestResult : RequestResult<object> { }
}