using Application.Global_Models;
using Domain;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace Application.Service
{
    public class GlobalQuery
    {
#if (DEBUG)
        private static string BaseURI = "https://dev.edi.md";
#endif
#if (RELEASE)
        private static string BaseURI = "https://survey.eservicii.md";
#endif
        public string Get(QueryDataGet queryData)
        {
            try
            {
                if (queryData.URL.Contains("ISNPSAPI"))
                {
#if (DEBUG)

                    BaseURI = "https://dev.edi.md";
#endif
#if RELEASE
                    BaseURI = "https://survey.eservicii.md";
#endif
                }
                if (queryData.URL.Contains("ISAuthService"))
                {
#if (DEBUG)
                    BaseURI = "https://dev.edi.md";
#endif
#if RELEASE
                    BaseURI = "https://api.eservicii.md";
#endif
                }
                //                if (queryData.URL.Contains("ISNPSAPI"))
                //                {
                //#if (DEBUG)

                //                    BaseURI = "https://survey.eservicii.md";
                //#endif
                //#if RELEASE
                //                    BaseURI = "https://survey.eservicii.md";
                //#endif
                //                }
                //                if (queryData.URL.Contains("ISAuthService"))
                //                {
                //#if (DEBUG)
                //                    BaseURI = "https://api.eservicii.md";
                //#endif
                //#if RELEASE
                //                    BaseURI = "https://api.eservicii.md";
                //#endif
                //                }
                //Credentials for WCF
                HttpClient _httpClient = new HttpClient();
                if (queryData != null)
                {
                    _httpClient.BaseAddress = new Uri(BaseURI + queryData.URL);
                    //устанавливает заголовок аутентификации "Basic"
                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                        Convert.ToBase64String(Encoding.UTF8.GetBytes(queryData.Credentials)));

                    var response = _httpClient.GetAsync(_httpClient.BaseAddress).Result;
                    response.EnsureSuccessStatusCode();

                    var content = response.Content.ReadAsStringAsync().Result;

                    return content;
                }
                else
                {
                    BaseResponse baseResponse = new BaseResponse()
                    {
                        ErrorCode = EnErrorCode.Internal_error,
                        ErrorMessage = "Object 'QueryData' cannot be null."
                    };

                    return JsonConvert.SerializeObject(baseResponse);
                }
            }
            catch (Exception ex)
            {

                BaseResponse baseResponse = new BaseResponse()
                {
                    ErrorCode = EnErrorCode.Internal_error,
                    ErrorMessage = ex.Message + "|||" + ex.StackTrace
                };

                return JsonConvert.SerializeObject(baseResponse);
            }
        }

        public async Task<string> GetAsync(QueryDataGet queryData)
        {
            try
            {
                if (queryData.URL.Contains("ISNPSAPI"))
                {
#if (DEBUG)

                    BaseURI = "https://dev.edi.md";
#endif
#if RELEASE
                    BaseURI = "https://survey.eservicii.md";
#endif
                }
                if (queryData.URL.Contains("ISAuthService"))
                {
#if (DEBUG)
                    BaseURI = "https://dev.edi.md";
#endif
#if RELEASE
                    BaseURI = "https://api.eservicii.md";
#endif
                }
                HttpClient _httpClient = new HttpClient();
                if (queryData != null)
                {
                    _httpClient.BaseAddress = new Uri(BaseURI + queryData.URL);

                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                        Convert.ToBase64String(Encoding.UTF8.GetBytes(queryData.Credentials)));

                    var response = await _httpClient.GetAsync(_httpClient.BaseAddress);
                    response.EnsureSuccessStatusCode();

                    var content = await response.Content.ReadAsStringAsync();

                    return content;
                }
                else
                {
                    BaseResponse baseResponse = new BaseResponse()
                    {
                        ErrorCode = EnErrorCode.Internal_error,
                        ErrorMessage = "Object 'QueryData' cannot be null."
                    };

                    return JsonConvert.SerializeObject(baseResponse);
                }
            }
            catch (Exception ex)
            {

                BaseResponse baseResponse = new BaseResponse()
                {
                    ErrorCode = EnErrorCode.Internal_error,
                    ErrorMessage = ex.Message + "|||" + ex.StackTrace
                };

                return JsonConvert.SerializeObject(baseResponse);
            }
        }

        public async Task<string> DeletAsync(QueryDataGet queryData)
        {
            try
            {
                if (queryData.URL.Contains("ISNPSAPI"))
                {
#if (DEBUG)

                    BaseURI = "https://dev.edi.md";
#endif
#if RELEASE
                    BaseURI = "https://survey.eservicii.md";
#endif
                }
                if (queryData.URL.Contains("ISAuthService"))
                {
#if (DEBUG)
                    BaseURI = "https://dev.edi.md";
#endif
#if RELEASE
                    BaseURI = "https://api.eservicii.md";
#endif
                }
                HttpClient _httpClient = new HttpClient();
                if (queryData != null)
                {
                    _httpClient.BaseAddress = new Uri(BaseURI + queryData.URL);

                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                        Convert.ToBase64String(Encoding.UTF8.GetBytes(queryData.Credentials)));

                    var response = await _httpClient.DeleteAsync(_httpClient.BaseAddress);
                    response.EnsureSuccessStatusCode();

                    var content = await response.Content.ReadAsStringAsync();

                    return content;
                }
                else
                {
                    BaseResponse baseResponse = new BaseResponse()
                    {
                        ErrorCode = EnErrorCode.Internal_error,
                        ErrorMessage = "Object 'QueryData' cannot be null."
                    };

                    return JsonConvert.SerializeObject(baseResponse);
                }
            }
            catch (Exception ex)
            {

                BaseResponse baseResponse = new BaseResponse()
                {
                    ErrorCode = EnErrorCode.Internal_error,
                    ErrorMessage = ex.Message + "|||" + ex.StackTrace
                };

                return JsonConvert.SerializeObject(baseResponse);
            }
        }
        public async Task<string> PostAsync(QueryDataPost queryData)
        {
            try
            {
                if (queryData.URL.Contains("ISNPSAPI"))
                {
#if (DEBUG)

                    BaseURI = "https://dev.edi.md";
#endif
#if RELEASE
                    BaseURI = "https://survey.eservicii.md";
#endif
                }
                if (queryData.URL.Contains("ISAuthService"))
                {
#if (DEBUG)
                    BaseURI = "https://dev.edi.md";
#endif
#if RELEASE
                    BaseURI = "https://api.eservicii.md";
#endif
                }
                var requestContent = new StringContent(queryData.JSON, Encoding.UTF8, "application/json");
                //Credentials for WCF
                HttpClient _httpClient = new HttpClient();

                if (queryData != null)
                {
                    _httpClient.BaseAddress = new Uri(BaseURI + queryData.URL);

                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                        Convert.ToBase64String(Encoding.UTF8.GetBytes(queryData.Credentials)));

                    var response = await _httpClient.PostAsync("", requestContent);
                    response.EnsureSuccessStatusCode();

                    var content = await response.Content.ReadAsStringAsync();

                    return content;
                }
                else
                {
                    BaseResponse baseResponse = new BaseResponse()
                    {
                        ErrorCode = EnErrorCode.Internal_error,
                        ErrorMessage = "Object 'QueryData' cannot be null."
                    };

                    return JsonConvert.SerializeObject(baseResponse);
                }
            }
            catch (Exception ex)
            {

                BaseResponse baseResponse = new BaseResponse()
                {
                    ErrorCode = EnErrorCode.Internal_error,
                    ErrorMessage = ex.Message + "|||" + ex.StackTrace
                };

                return JsonConvert.SerializeObject(baseResponse);
            }
        }

    }
}
