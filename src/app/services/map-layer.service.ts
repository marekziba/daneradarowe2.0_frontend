import { Injectable } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { Observable, Subject, zip } from 'rxjs';
import { BaseProviderService } from './base-provider.service';
import { DataService } from './data.service';
import { LocationService } from './location.service';
import { RadarsService } from './radars.service';
import { VectorService } from './vector.service';

@Injectable({
  providedIn: 'root'
})
export class MapLayerService {
  private layers: BaseLayer[];
  private providers: BaseProviderService[];

  constructor(
    private dataService: DataService,
    private radarService: RadarsService,
    private locationService: LocationService,
    private vectorService: VectorService
  ) {
    this.providers = [
      dataService,
      radarService,
      locationService,
      vectorService
    ];
  }

  getLayers(): Observable<BaseLayer[]> {
    return zip(this.providers.map((provider) => provider.getLayer()));
  }
}
