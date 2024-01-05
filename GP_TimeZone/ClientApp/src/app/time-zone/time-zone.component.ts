import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUTimeZone, IUTime } from 'src/app/interface/app.iu-interface';
import { IUError } from 'src/app/domain/app.domain';

@Component({
  selector: 'time-zone',
  templateUrl: './time-zone.component.html',
  styleUrls: ['./time-zone.component.css']
})

export class TimeZoneComponent {

  public timezones: IUTimeZone[] = [];

  public iuTime: IUTime | undefined;
  public iUError: IUError | undefined;;

  public http: HttpClient;
  public baseUrl: string;

  public processAll : boolean = false;
  public processingAll: boolean = false;  
  public partial: number = 0;
  public total : number = 0;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.GetList();
  }

  GetList() {
    this.http.get<IUTimeZone[]>(this.baseUrl + 'timezone').subscribe
      (
        result => {
          this.timezones = result;
        },
        error => this.GetError(error)
    );
  }

  GetTime(index: number, areaName: string, subAreaName: string, regionName : string, showAll : boolean) {

    var url = 'timezone/GetTime?timeZone=';

    if (this.timezones != null && this.timezones.length > index) {
      this.timezones[index].processing = true;
      this.timezones[index].dateTimeString = "...";
      
      if (!showAll) {        
        for (var i = 0; i < 10000000; i++) { }
      };

      var param = areaName;
      if (subAreaName != null && subAreaName != '' && subAreaName!='-') param = param + '/' + subAreaName;
      if (regionName != null && regionName != '' && regionName != '-') param = param + '/' + regionName;

      var CompleteUrl = this.baseUrl + url + encodeURIComponent(param);
                  
      this.http.get<IUTime>(CompleteUrl).subscribe
        (
          result => {
            if (showAll) this.partial = this.partial + 1;
            this.iuTime = result;
            this.timezones[index].dateTimeString = this.iuTime.dateTimeString;
            this.ChangeClassOk(index);            
          },
          error => {
            if (showAll) this.partial = this.partial + 1;
            this.ChangeClassError(index);
            this.timezones[index].dateTimeString = "Error";
            this.timezones[index].processing = false;
            this.GetError(error);
          },
          () => {
            if (showAll) {
              if (this.partial == this.total) this.processingAll = false;
            } else {
              this.processAll = false;
              this.processingAll = false;
            }
            this.timezones[index].processing = false;
          }
        );
    }
  }

  GetAllTimes() {
    this.CleanErrorMessage();
    this.processAll = true; this.processingAll = true;
    this.partial = 0;
    this.total = this.timezones.length;
    this.timezones.forEach((timezone, index) =>
    {      
      this.GetTime(index, timezone.areaName, timezone.subAreaName, timezone.regionName, true);
    });    
  }

  GetError(error: HttpErrorResponse) {
    console.error(error);
    var anchor = "#time-zone-component-DivError";
    document.getElementById(anchor)?.scrollIntoView();   
    this.iUError = new IUError(error);    
  }

  GoAnchor(index:number) {
    var div = "timezone_" +index;    
    document.getElementById(div)?.scrollIntoView();
  }

  ChangeClassOk(index:number){
    var divName = "row_timezone_" +index;    
    var div = document.getElementById(divName);
    if (div!=null) div.className ="row_timezone_ok";    
  }

  ChangeClassError(index:number){
    var divName = "row_timezone_" +index;    
    var div = document.getElementById(divName);
    if (div!=null) div.className ="alert alert-danger";    
  }

  CleanErrorMessage() {
    this.iUError = undefined;
  }
}
