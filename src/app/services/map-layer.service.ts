import { Injectable } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { combineLatest, Observable, Subject, zip } from 'rxjs';
import { BaseMapLayer } from '../utils/BaseMapLayer';
import { BaseProviderService } from './base-provider.service';
import { LocationService } from './location.service';
import { RadarImageService } from './radar-image.service';

@Injectable({
  providedIn: 'root'
})
export class MapLayerService {
  private layers: BaseMapLayer[];
  private providers: BaseProviderService[];

  constructor(
    private locationService: LocationService,
    private radarImageService: RadarImageService
  ) {
    this.providers = [
      locationService,
      radarImageService
    ];
  }

  getLayers(): Observable<BaseMapLayer[]> {
    return combineLatest(this.providers.map((provider) => provider.getLayer()));
  }
}
