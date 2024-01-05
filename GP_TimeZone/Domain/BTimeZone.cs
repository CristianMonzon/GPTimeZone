using System;

namespace GP_TimeZone.Domain
{
    public class BTimeZone
    {
        public Area Area { get; set; }
        public SubArea SubArea { get; set; }

        public string? RegionName { get; set; }

        public string SubAreaName
        {
            get
            {
                if (SubArea != null && SubArea.Name != null) return SubArea.Name;
                else return "-";
            }
        }
        
        public string AreaName
        {
            get
            {
                if (Area != null && Area.Name != null) return Area.Name;
                else return "-";
            }
        }

        public BTimeZone()
        {

        }
        public BTimeZone(string dTimeZone)
        {
            CreateArea(dTimeZone);
        }

        private void CreateArea(string dTimeZone)
        {
            if (!string.IsNullOrEmpty(dTimeZone))
            {
                var arraydTimeZone = dTimeZone.Split('/');

                Area = new Area(arraydTimeZone[0]);
                if (arraydTimeZone.Length > 1)
                {
                    SubArea = new SubArea(arraydTimeZone[1]);

                    if (arraydTimeZone.Length > 2) {
                        RegionName = arraydTimeZone[2];
                    }
                }
                else
                {
                    SubArea = new SubArea();
                }
            }
        }
    }
}