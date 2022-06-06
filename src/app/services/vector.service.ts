import { Injectable } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { BaseProviderService } from './base-provider.service';

@Injectable({
  providedIn: 'root'
})
export class VectorService extends BaseProviderService {

  constructor() {
    super();
  }

  getLayer(): BaseLayer {
      return new VectorLayer();
  }
}
