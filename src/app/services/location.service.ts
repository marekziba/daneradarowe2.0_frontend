import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from '../models/Location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  watcher = new Subject<Location>();
  private location: any;
  private directionSupport: boolean = false;
  
  constructor() { 
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
}
