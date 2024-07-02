using Application.Global_Models;
using System.Runtime.Serialization;

namespace ISNPSWeb.Middleware
{
    [Serializable]
    public class Exception_Response<T> : ApplicationException where T : BaseResponse
    {
        private T _baseResponse;
        public T BaseResponse
        {
            get { return _baseResponse; }
            set { _baseResponse = value; }
        }

        public Exception_Response() { }

        public Exception_Response(string message) : base(message) { }

        public Exception_Response(string message, Exception inner) : base(message, inner) { }

        public Exception_Response(string message, T baseResponse) : base(message)
        {
            _baseResponse = baseResponse;
        }
        public Exception_Response(string message, Exception inner, T baseResponse) : base(message, inner)
        {
            _baseResponse = baseResponse;
        }

        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            base.GetObjectData(info, context);
            info.AddValue("BaseResponse", this.BaseResponse, typeof(T));
        }
        protected Exception_Response(SerializationInfo info, StreamingContext context) : base(info, context)
        {
            if (info != null)
            {
                this._baseResponse = (T)info.GetValue("BaseResponse", typeof(T));
            }
        }
    }


}
