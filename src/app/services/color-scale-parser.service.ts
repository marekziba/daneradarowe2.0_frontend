import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ColorScale } from '../utils/ColorScale';

@Injectable({
  providedIn: 'root'
})
export class ColorScaleParserService {

  constructor(private http: HttpClient) { }

  getColorScale(scaleUrl: string): Observable<ColorScale> {
    return this.http.get(scaleUrl).pipe(map(() => new ColorScale()))
  }
}
