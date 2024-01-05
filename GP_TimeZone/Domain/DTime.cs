namespace GP_TimeZone.Domain
{
    public class DTime
    {
        public int year { get; set; }
        public int month { get; set; }
        public int day { get; set; }
        public int hour { get; set; }
        public int minute { get; set; }
        public int seconds { get; set; }
        public int milliSeconds { get; set; }
        public DateTime dateTime { get; set; }
        public string date { get; set; }
        public string time { get; set; }
        public string timeZone { get; set; }
        public string dayOfWeek { get; set; }
        public bool dstActive { get; set; }

        public DTime() 
        {
        }
    
    }
}