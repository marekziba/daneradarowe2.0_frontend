import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { interval, timer, Observable, Subject, Subscription, map } from 'rxjs';
import { Image } from '../models/Image.model';
import { Product } from '../models/Product.model';
import { Radar } from '../models/Radar.model';
import { Scan } from '../models/Scan.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // state attributes
  private selectedRadar?: Radar = undefined;
  private selectedScan?: Scan = undefined;
  private selectedProduct?: Product = undefined;

  dataSource = new Subject<Image[]>();
  radarChanged = new Subject<Radar>();

  constructor(private http: HttpClient) { }

  public set scan(scan: Scan) {
    this.selectedScan = scan;
  }

  public set radar(radar: Radar){
    this.selectedRadar = radar;
    this.radarChanged.next(radar);
  }

  public set product(product: Product){
    this.product = product;
  }

  public requestData(): Observable<{}> {
    const radarId = this.selectedRadar ? this.selectedRadar.codeName : 'LEG';
    // const scanR = this.selectedScan.range;

    return this.http.post('https://daneradarowe.pl/api/getData', {
      rstd: `${radarId}_125_dBZ_1`,
      n: 12
    });
  }
}
