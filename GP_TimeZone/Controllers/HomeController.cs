using Microsoft.AspNetCore.Mvc;

namespace GP_TimeZone.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return "test home";
        }
    }
}
