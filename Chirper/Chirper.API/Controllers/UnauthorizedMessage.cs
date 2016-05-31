using System.Net.Http;
using System.Threading.Tasks;
using System.Threading;
using System.Web.Http;
using System.Net;

namespace Chirper.API.Controllers
{
    public class UnauthorizedMessage : IHttpActionResult 
    {
        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpRequestMessage request = new HttpRequestMessage();
            HttpError error = new HttpError("No username corresponds to the token provided.");
            var response = request.CreateErrorResponse(HttpStatusCode.Unauthorized, error);
            
            return Task.FromResult(response);
        }
    }
}