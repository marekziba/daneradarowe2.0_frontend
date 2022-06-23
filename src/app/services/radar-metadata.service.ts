import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { map, Observable, of, Subject } from 'rxjs';
import { ProductGroup } from '../models/ProductGroup.model';
import { Radar } from '../models/Radar.model';
import { ColorScale } from '../utils/ColorScale';

@Injectable({
  providedIn: 'root'
})
export class RadarMetadataService {
  private radarsSource$: Observable<Radar[]>;

  private radars$: Observable<Radar[]>;
  private selectedRadar$: Subject<Radar>;

  constructor(private http: HttpClient) {
    this.setupSource();
  }

  private setupSource(): void {
    this.radarsSource$ = this.http.get('http://localhost/api/Radars').pipe(
      map(((response: Object[]) => plainToClass(Radar, response)))
    );
  }

  setRadar(radar: Radar): void {
    this.selectedRadar$.next(radar);
  }

  getSelectedRadarObservable(): Observable<Radar> {
    return this.selectedRadar$.asObservable();
  }

  getRadars(): Observable<Radar[]> {
    return this.radarsSource$;
  }

  getProducts(): Observable<ProductGroup[]> {
    return of([])
  }

  getColorScaleObservable(): Observable<ColorScale> {
    return of(null);
  }
}
