import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';
import { combineLatest, map, Observable, Subject, withLatestFrom, zip } from 'rxjs';
import { AppSelectors } from '../state/app.selector';
import { BaseMapLayer } from '../utils/BaseMapLayer';
import { BaseProviderService } from './base-provider.service';
import { LocationService } from './location.service';
import { RadarImageService } from './radar-image.service';
import { GeneralState } from '../state/app.state';
import { Image } from '../models/Image.model';

@Injectable({
  providedIn: 'root'
})
export class MapLayerService {
  private layers: BaseMapLayer[];
  private providers: BaseProviderService[];

  private mapImageLayer: Image;

  constructor(
    private locationService: LocationService,
    private radarImageService: RadarImageService,
    private store: Store
  ) {
    this.providers = [
      locationService,
      radarImageService
    ];
  }

  getLayers(): Observable<BaseMapLayer[]> {
    return combineLatest(this.providers.map((provider) => provider.getLayer()));
  }

  buildImage(image: Image, general: GeneralState): ImageLayer<Static> {
    return new ImageLayer();
  }

  getImage(): Observable<ImageLayer<Static>> {
    return this.store.select(AppSelectors.getCurrentImage).pipe(
      withLatestFrom(this.store.select(AppSelectors.getGeneral)),
      map(([image, general]) => this.buildImage(image, general))
    )
  }
}
