import { Injectable } from '@angular/core';
import { catchError, Subject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  private selectionModeEnabled: boolean = false;
  private darkModeEnabled: boolean = false;

  selectionModeChanged = new Subject<boolean>();
  darkModeSubject = new Subject<boolean>();

  constructor(
    private dataService: DataService
  ) { }

  public setSelectionMode(mode: boolean) {
    this.selectionModeEnabled = mode;
    this.selectionModeChanged.next(mode);
  }

  public get selectionMode(): boolean { return this.selectionModeEnabled; }
}
