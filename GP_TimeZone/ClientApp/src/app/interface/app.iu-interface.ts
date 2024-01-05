
export interface IUTimeZone {
  areaName: string;
  subAreaName: string;
  regionName: string;
  dateTimeString: string;

  processing: boolean;
}

export interface IUTime {
  dateTime: Date;
  dateTimeString: string;
}

