import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseMapLayer } from '../utils/BaseMapLayer';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseProviderService {
  private static idCount: number = 0;
  protected id: number;

  constructor() { 
    this.id = BaseProviderService.idCount++;
  }

  abstract getLayer(): Observable<BaseMapLayer>;
}
