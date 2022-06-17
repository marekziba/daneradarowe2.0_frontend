import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './controls/header/header.component';
import { SliderComponent } from './controls/slider/slider.component';
import { LocationService } from './services/location.service';
import { HeaderDropdownComponent } from './controls/header/header-dropdown/header-dropdown.component';
import { HeaderDropdownSectionComponent } from './controls/header/header-dropdown/header-dropdown-section/header-dropdown-section.component';
import { HeaderDropdownElementComponent } from './controls/header/header-dropdown/header-dropdown-element/header-dropdown-element.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MapWrapperComponent } from './map-wrapper/map-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    SliderComponent,
    HeaderDropdownComponent,
    HeaderDropdownSectionComponent,
    HeaderDropdownElementComponent,
    MapWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
