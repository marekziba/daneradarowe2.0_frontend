import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { interval, timer, Observable, Subject, Subscription } from 'rxjs';
import { Image } from '../models/Image.model';
import { Product } from '../models/Product.model';
import { Radar } from '../models/Radar.model';
import { Scan } from '../models/Scan.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubscription: Subscription;

  // state attributes
  private selectedRadar?: Radar = undefined;
  private selectedScan?: Scan = undefined;
  private selectedProduct?: Product = undefined;

  dataSource = new Subject<Image[]>();

  constructor(private http: HttpClient) {
    // this.requestData();
    this.dataSubscription = timer(0, 30 * 1000).subscribe(
      () => {
        this.requestData();
      }
    );
  }

  private requestData() {
    this.http.post('https://daneradarowe.pl/api/getData', {
      rstd: 'LEG_125_dBZ_1',
      n: 12
    }).subscribe((responseData: Image[]) => {
      this.dataSource.next(responseData);
    })
  }
}
