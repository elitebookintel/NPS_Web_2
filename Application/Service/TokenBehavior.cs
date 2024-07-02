using Application.Global_Models;
using Application.Service.Token;
using Domain;
using MediatR;

namespace Application.Service
{
    public class TokenBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
      where TRequest : IRequest<TResponse>
      where TResponse : BaseResponse
    {
        private readonly ITokenService _tokenService;

        public TokenBehavior(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (request is BaseQueryModel baseQueryModel)
            {
                if (baseQueryModel == null) baseQueryModel = new BaseQueryModel();

                if (baseQueryModel.guid_CookieLock != null && baseQueryModel.guid_CookieLock.Token!=null && baseQueryModel.guid_CookieLock.Token!="")
                {
                    await baseQueryModel.guid_CookieLock.SemaphoreSlim.WaitAsync();
                }
                else
                {
                    var Guid_Cookie = await _tokenService.Set_Token_Urgently();
                    if (string.IsNullOrEmpty(Guid_Cookie) || baseQueryModel.guid_CookieLock==null)
                        baseQueryModel.guid_CookieLock = new Guid_CookieLock { Token = _tokenService.Get_Token_Urgently() };
                    await baseQueryModel.guid_CookieLock.SemaphoreSlim.WaitAsync();
                }
                try
                {
                    return await next();
                }
                catch (Exception ex)
                {
                    var errorResponse = new BaseResponse
                    {
                        ErrorCode = EnErrorCode.Internal_error,
                        ErrorMessage = ex.Message
                    };
                    return errorResponse as TResponse;
                }
                finally
                {
                    baseQueryModel.guid_CookieLock.SemaphoreSlim.Release();
                }
            }
            else
            {
                return await next();
            }
        }
    }
}