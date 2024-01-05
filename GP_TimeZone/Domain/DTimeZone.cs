namespace GP_TimeZone.Domain
{
    public class DTimeZone
    {
        public string? Zone { get; set; }
        public bool HasZone
        {
            get
            {
                return (!string.IsNullOrEmpty(Zone));
            }
        }

        public DTimeZone()
        {
        }

        public DTimeZone(string zone)
        {
            Zone = zone;
        }
    }
}