﻿namespace Telegram.Server.Core
{
    public class RequestResult<T>
    {
        public bool Success { get; set; }

        public string ErrorMessage { get; set; }

        public T Result { get; set; }

        public RequestResult(bool success, string errorMessage = "") 
            : this(success, default(T), errorMessage)
        {
        }

        public RequestResult(bool success, T result, string errorMessage = "")
        {
            Success = success;
            ErrorMessage = errorMessage;
            Result = result;
        }
    }

    public class RequestResult : RequestResult<object>
    {
        public RequestResult(bool success, string errorMessage = "") : base(success, errorMessage)
        {
        }

        public RequestResult(bool success, object result) : base(success, result)
        {
        }
    }
}