import { Injectable } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { Subject } from 'rxjs';
import { Location } from '../models/Location.model';
import { BaseProviderService } from './base-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseProviderService {
  watcher = new Subject<Location>();
  private location: any;
  private directionSupport: boolean = false;
  
  constructor() { 
    super();

    if(navigator.geolocation){
      navigator.geolocation.watchPosition(
        (position) => {
          this.watcher.next(
            new Location(position.coords.latitude, position.coords.longitude)
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

  getLayer(): BaseLayer {
      return new VectorLayer();
  }
}
