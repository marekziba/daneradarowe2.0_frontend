import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Config } from '../utils/Config';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  private config$ = new BehaviorSubject<Config>(Config.getSavedOrDefault());

  constructor() { }
}
