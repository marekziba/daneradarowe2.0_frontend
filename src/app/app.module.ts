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
import { HeaderScaleComponent } from './controls/header/header-scale/header-scale.component';
import { HeaderContentComponent } from './controls/header/header-content/header-content.component';
import { mapReducer, generalReducer, radarImageReducer, radarMetaReducer } from './state/app.reducer';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SliderControlsComponent } from './controls/slider/slider-controls/slider-controls.component';

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
    HeaderScaleComponent,
    HeaderContentComponent,
    SliderControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      radarMeta: radarMetaReducer,
      radarImage: radarImageReducer,
      map: mapReducer,
      general: generalReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([]),
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
