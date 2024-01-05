using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using GP_TimeZone.Domain;

namespace GP_TimeZone.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TimeZoneController : ControllerBase
    {
        protected readonly string URLBASE = "https://www.timeapi.io";

        protected readonly ILogger<DTimeZone> _logger;

        public TimeZoneController(ILogger<DTimeZone> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IList<BTimeZone>> GetAsync()
        {
            List<BTimeZone> listBTimeZone = new List<BTimeZone>();

            string url = $"{URLBASE}/api/TimeZone/AvailableTimeZones";

            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            var response = await client.SendAsync(request);

            response.EnsureSuccessStatusCode();

            if (response.IsSuccessStatusCode)
            {
                var stringJson = await response.Content.ReadAsStringAsync();
                List<string>? timeZones = JsonConvert.DeserializeObject<List<string>>(stringJson);

                List<DTimeZone> returnList = new List<DTimeZone>();
                if (timeZones != null)
                {
                    foreach (var item in timeZones)
                    {
                        returnList.Add(new DTimeZone(item));
                    }
                }

                foreach (var item in returnList)
                {
                    if (item != null && item.HasZone && item.Zone != null)
                    {
                        listBTimeZone.Add(new BTimeZone(item.Zone));
                    }
                }
            }
            //Error with Etc
            //https://www.timeapi.io/api/Time/current/zone?timeZone=Etc/GMT+0
            return listBTimeZone.Where(c=>c.Area.Name!="Etc").ToList();            
        }

        /// <summary>
        /// Example : https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam
        /// </summary>
        /// <param name="timeZone"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("/{controller}/GetTime")]
        public async Task<BTime> GetTime(string timeZone)
        {
            BTime returnValue = new BTime();


            string url = $"{URLBASE}/api/Time/current/zone?timeZone={timeZone}";

            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            var response = await client.SendAsync(request);

            response.EnsureSuccessStatusCode();

            if (response.IsSuccessStatusCode)
            {
                var stringJson = await response.Content.ReadAsStringAsync();
                DTime? dTime = JsonConvert.DeserializeObject<DTime>(stringJson);

                if (dTime != null)
                {
                    returnValue.dateTime = dTime.dateTime;
                }
            }
            return returnValue;
        }
    }
}