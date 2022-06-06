import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoundingBox } from '../models/BoundingBox.model';
import { Location } from '../models/Location.model';
import { Radar } from '../models/Radar.model';
import { BaseProviderService } from './base-provider.service';

@Injectable({
  providedIn: 'root'
})
export class RadarsService extends BaseProviderService {
  private radarsList: Radar[] = [];

  subject = new Subject<Radar[]>();

  constructor(private http: HttpClient) { 
    super();

    this.http.get('https://localhost:8080/api/Radars')
      .pipe(
        map(
          (responseData: Array<any>) => {
            return responseData.map(
              (radar) =>  plainToClass(Radar, radar, {})
            )
          }
        )
      ).subscribe(
        (radars: Radar[]) => {
          console.log(radars);
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

  getLayer(): BaseLayer {
      return new VectorLayer();
  }
}
