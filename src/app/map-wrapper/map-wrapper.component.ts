import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Radar } from '../models/Radar.model';
import { MapLayerService } from '../services/map-layer.service';
import { RadarMetadataService } from '../services/radar-metadata.service';
import { BaseMapLayer } from '../utils/BaseMapLayer';

@Component({
  selector: 'app-map-wrapper',
  templateUrl: './map-wrapper.component.html',
  styleUrls: ['./map-wrapper.component.scss']
})
export class MapWrapperComponent implements OnInit {
  layers$: Observable<BaseMapLayer[]>;
  radars$: Observable<Radar[]>;
  selectedRadar$: Observable<Radar>;

  constructor(
    private layerService: MapLayerService,
    private radarService: RadarMetadataService
  ) { }

  ngOnInit(): void {
    this.layers$ = this.layerService.getLayers();
    this.radars$ = this.radarService.getRadars();
    this.selectedRadar$ = this.radarService.getSelectedRadarObservable();
  }

}
