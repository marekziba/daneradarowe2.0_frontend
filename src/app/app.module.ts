import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './controls/header/header.component';
import { SliderComponent } from './controls/slider/slider.component';
import { LocationService } from './services/location.service';
import { ControlsService } from './services/controls.service';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
