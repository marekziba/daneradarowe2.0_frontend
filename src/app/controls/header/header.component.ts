import { Component, OnInit } from '@angular/core';
import { Radar } from 'src/app/models/Radar.model';
import { ControlsService } from 'src/app/services/controls.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedRadar: Radar;

  constructor(
    private controlsService: ControlsService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.radarChanged.subscribe(
      (radar: Radar) => {
        this.selectedRadar = radar;
      }
    )

    this.controlsService.selectionModeChanged.subscribe((e) => console.log(e));
  }

  selectionModeToggle(){
    const currentMode = this.controlsService.selectionMode;
    this.controlsService.setSelectionMode(!currentMode);
  }
}
