import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoundingBox } from '../models/BoundingBox.model';
import { Location } from '../models/Location.model';
import { Radar } from '../models/Radar.model';

@Injectable({
  providedIn: 'root'
})
export class RadarsService {
  private radarsList: Radar[] = [];

  subject = new Subject<Radar[]>();

  constructor(private http: HttpClient) { 
    this.http.get('assets/radars2.json')
      .pipe(
        map(
          (responseData: Array<any>) => {
            return responseData.map(
              (radar) =>  new Radar(radar.name, radar.id, new Location(radar.location[0], radar.location[1]), BoundingBox.fromArray(radar.boundingBox['125']))
            )
          }
        )
      ).subscribe(
        (radars: Radar[]) => {
          this.radarsList = radars;
          this.subject.next(radars);
        }
      )
  }

  public getRadars(): Radar[] {
    return this.radarsList.slice()
  }

  public getRadarById(id: string): Radar {
    return this.radarsList.find(radar => radar.codeName === id);
  }
}
