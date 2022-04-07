import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  private selectionModeEnabled: boolean = false;
  private darkModeEnabled: boolean = false;

  public selectionModeSubject = new Subject<boolean>();
  public darkModeSubject = new Subject<boolean>();

  constructor() { }
}
