import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import { map, Observable, of, Subject } from 'rxjs';
import { Location } from '../models/Location.model';
import { BaseMapLayer } from '../utils/BaseMapLayer';
import { BaseProviderService } from './base-provider.service';
import { Icon } from 'ol/style';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseProviderService {
  watcher = new Subject<Location>();
  private currentLocation: Location;
  private directionSupport: boolean = false;

  private locationPointStyle: Style;
  
  constructor() { 
    super();

    this.locationPointStyle = new Style({
      image: new Icon({
        scale: 0.6,
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'assets/location.svg'
      })
    });

    if(navigator.geolocation){
      navigator.geolocation.watchPosition(
        (position) => {
          this.currentLocation = new Location(position.coords.latitude, position.coords.longitude);
          this.watcher.next(
            this.currentLocation
          )
        }, (error) => {
          console.error(error)
        },
        {
          enableHighAccuracy: true
        }
      );
    }
  }

  hasDirectionSupport(): boolean {
    return this.directionSupport;
  }

  getLayer(): Observable<BaseMapLayer> {
    return this.watcher.pipe(map((location: Location) => {
      const pointFeature = new Feature(new Point(fromLonLat(location.getLonLat())));
      pointFeature.setStyle(this.locationPointStyle);
      return new BaseMapLayer(this.id, new VectorLayer({
        source: new VectorSource({
          features: [pointFeature]
        })
      }))
    }));
  }

  getPosition(): Observable<Location> {
    return this.watcher;
  }
}
