using System;

namespace GP_TimeZone.Domain
{
    public class BTime
    {

        public DateTime dateTime { get; set; }

        public string dateTimeString
        {
            get
            {
                return dateTime.ToShortTimeString();
            }
        }
        public BTime()
        {
        }

    }
}