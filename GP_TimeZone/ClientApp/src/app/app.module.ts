//------------------------------------------
//Root module of the project
//------------------------------------------

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TimeZoneComponent } from './time-zone/time-zone.component';
import { AppErrorComponent } from './app-error/app-error.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TimeZoneComponent,
    AppErrorComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
    [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'time-zone', component: TimeZoneComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
