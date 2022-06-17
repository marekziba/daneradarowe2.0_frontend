import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Map, Overlay, Tile, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { Image } from '../models/Image.model';
import { Radar } from '../models/Radar.model';
import { BaseMapLayer } from '../utils/BaseMapLayer';
import { Zoom } from 'ol/control';
import TileImage from 'ol/source/TileImage';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  private map: Map;
  private tileLayer: TileLayer<TileImage>;

  @Input() radars: Radar[];
  @Input() selectedRadar: Radar;
  @Input() selectionModeEnabled: boolean;
  @Input() mapLayers: BaseMapLayer[];
  @Input() currentImage: Image = undefined;

  @Output() radarSelected = new EventEmitter<Radar>();

  @ViewChildren("radarMarker") markerRef: QueryList<ElementRef>;

  ngOnInit(): void {
    this.initializeMap();
  }

  ngAfterViewInit(){
    this.markerRef.changes.subscribe(
      e => {
        console.log(this.markerRef.toArray());
        this.markerRef.toArray().map((marker: ElementRef) => {+
          this.map.addOverlay(
            new Overlay({
              element: marker.nativeElement,
              position: fromLonLat(this.radars.find(radar => radar.id == marker.nativeElement.getAttribute('radarId')).location.getLonLat()),
              positioning: 'center-center'
            })
          )
        })
      }
    )
  }

  private initializeMap(): void {
    this.map = new Map({
      controls: [new Zoom({
        className: 'zoom-control',
        zoomInClassName: 'zoom-btn',
        zoomOutClassName: 'zoom-btn',
      })],
      view: new View({
        center: fromLonLat([19.4803, 52.0693]),
        zoom: 7,
        constrainResolution: true,
        maxZoom: 14
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      pixelRatio: 1
    });
  }

  onRadarSelect(radar: Radar) {
    this.radarSelected.emit(radar);
  }

  updateLayers(){
    this.map.setLayers([this.tileLayer, ...this.mapLayers.map(layer => layer.layer)]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLayers();
  }
}
