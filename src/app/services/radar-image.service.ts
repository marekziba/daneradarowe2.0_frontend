import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import VectorLayer from 'ol/layer/Vector';
import { map, Observable, of } from 'rxjs';
import { Image } from '../models/Image.model';
import { ProductVariant } from '../models/ProductVariant.model';
import { Radar } from '../models/Radar.model';
import { BaseMapLayer } from '../utils/BaseMapLayer';
import { BaseProviderService } from './base-provider.service';
import { RadarMetadataService } from './radar-metadata.service';

@Injectable({
  providedIn: 'root'
})
export class RadarImageService extends BaseProviderService {
  private dataSource$: Observable<Image[]>;
  private currentRadar$: Observable<Radar>;
  private currentProductVariant$: Observable<ProductVariant>;

  private images: Image[];

  constructor(
    private http: HttpClient,
    private metadataService: RadarMetadataService
  ) { 
    super();
  }

  public getImages(): void {
    this.dataSource$ = this.http.get('https://localhost:8080/api/Images', {
      params: {
        productId: 0
      }
    }).pipe(map((images: []) => plainToClass(Image, images)));
  }

  getLayer(): Observable<BaseMapLayer> {
    return of(new BaseMapLayer(this.id, new VectorLayer()));
  }
}
