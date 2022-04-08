import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Feature, Map, Overlay, View } from 'ol';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, transformExtent } from 'ol/proj';
import OSM from 'ol/source/OSM';
import Static from 'ol/source/ImageStatic';
import { LocationService } from '../services/location.service';
import { Location } from '../models/Location.model';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Observable, Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Point } from 'ol/geom';
import {Style, Icon, Stroke, Fill} from 'ol/style';
import { DataService } from '../services/data.service';
import { Image } from '../models/Image.model';
import { RadarsService } from '../services/radars.service';
import { Radar } from '../models/Radar.model';
import { MaskPolygon } from '../utils/MaskPolygon';
import { ControlsService } from '../services/controls.service';
// import ImageCanvasSource from 'ol/source/ImageCanvas';
// import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private locationSubsciption = new Subscription();
  private dataSubscription = new Subscription();
  private selectionModeSubscription = new Subscription();
  private imageSubscripton = new Subscription();

  private dataSource: Observable<any>;

  private map: Map;
  private imageSource: Static;
  private imageLayer: ImageLayer<Static>;
  private markerLayer: VectorLayer<VectorSource>;
  private vectorSource: VectorSource;
  private iconFeature: Feature;

  private maskLayer = new VectorLayer<VectorSource>();

  public radars: Radar[] = [];
  public selectedRadar: Radar = undefined;
  public currentImage: Image = undefined;

  public selectionModeEnabled: boolean = false;

  @ViewChildren("radarMarker") markerRef: QueryList<ElementRef>;

  constructor(
    private locationService: LocationService, 
    private dataService: DataService,
    private radarsService: RadarsService,
    private controlsService: ControlsService
    ) { }

  ngOnInit(): void {
    this.initializeMap();
    this.initializeMarkerLayer();
    this.initializeImageLayer();
    this.initializeGeolocation();
    this.initializeSubscriptions();
  }

  ngAfterViewInit(){
    this.markerRef.changes.subscribe(
      e => {
        console.log(this.markerRef.toArray());
        this.markerRef.toArray().map((marker: ElementRef) => {
          this.map.addOverlay(
            new Overlay({
              element: marker.nativeElement,
              position: fromLonLat(this.radarsService.getRadarById(marker.nativeElement.getAttribute('radarId')).location.getLonLat()),
              positioning: 'center-center'
            })
          )
        })
      }
    )
  }

  private initializeSubscriptions() {
    this.radarsService.subject.subscribe(
      (radars: Radar[]) => {
        this.radars = radars;
      }
    );

    this.reloadData();

    this.selectionModeSubscription = this.controlsService.selectionModeChanged.subscribe(
      (mode: boolean) => {
        this.selectionModeEnabled = mode;
      }
    );

    this.imageSubscripton = this.dataService.imageChanged.subscribe(
      (image: Image) => {
        this.currentImage = image;
      }
    );
  }

  private reloadData(){
    const timeout = timer(1000).subscribe(() => console.log('Seems like loading data takes a really long time...'));
    this.dataSubscription = this.dataService.requestData().pipe(
      map((images: Image[]) => {
        return images.map(
          (image: Image) => {
            return {
              map: new Static({
                interpolate: false,
                url: "https://daneradarowe.pl" + image.url,
                imageExtent: transformExtent(this.selectedRadar ? this.selectedRadar.boundingBox.flat('lonlat') : [11.812900, 56.186500, 25.157600, 48.133400], 'EPSG:4326', 'EPSG:3857')
              }),
              image: image
            }
          }
        )
      })
    ).subscribe(
        (images: {}) => {
          // console.log(this.selectedRadar.boundingBox.flat())
          timeout.unsubscribe();
          if(images[0].map.getUrl() !== this.imageLayer.getSource().getUrl() && this.selectedRadar){
            this.addImage(images[0].map);
            this.dataService.currentImage = images[0].image;
          }
        }
      );
  }

  private initializeMarkerLayer(){
    this.iconFeature = new Feature();
    this.iconFeature.setStyle(new Style({
      image: new Icon({
        scale: 0.6,
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'assets/location.svg'
      })
    }));

    this.vectorSource = new VectorSource({
      features: [this.iconFeature]
    });

    this.markerLayer = new VectorLayer({
      source: this.vectorSource
    });

    this.maskLayer.setStyle(new Style({
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0)'
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0.4)'
      })
    }));

    this.map.addLayer(this.maskLayer);
  }

  private initializeImageLayer(){
    this.imageSource = new Static({
      interpolate: false,
      url: '',
      imageExtent: transformExtent(this.selectedRadar ? this.selectedRadar.boundingBox.flat() : [11.812900, 56.186500, 25.157600, 48.133400], 'EPSG:4326', 'EPSG:3857')
    });

    this.imageLayer = new ImageLayer({
      source: this.imageSource,
      opacity: 0.8
    });

    this.map.addLayer(this.imageLayer);
  }

  private initializeMap(): void {
    this.map = new Map({
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

  switchRadar(radar: Radar) {
    // console.log(radar.codeName);
    this.selectedRadar = radar;
    this.dataService.radar = radar;
    this.imageLayer.setSource(
      new Static({url: '', imageExtent: [0.0, 0.0, 0.0, 0.0]})
    );
    this.reloadData();
    this.addMask();
  }

  addMask() {
    const mask = new MaskPolygon(this.selectedRadar.location.getLonLat(), 125500);
    mask.translate(0, 500);
    // const mask = new MaskPolygon(this.selectedRadar.location.getLonLat(), 251000);
    // mask.translate(0, 1000);
    const maskSource = mask.getSource();
    this.maskLayer.setSource(maskSource);
  }

  private addImage(image: Static): void {
    this.imageLayer.setSource(image);
  }

  initializeGeolocation(){
    this.locationSubsciption = this.locationService.watcher.subscribe(
      (location: Location) => {
        console.log(location.getLatLon())
        this.iconFeature.setGeometry(new Point(fromLonLat(location.getLonLat())));
      }
    )

    this.map.addLayer(this.markerLayer);
  }

  ngOnDestroy(): void {
    this.locationSubsciption.unsubscribe();
    this.dataSubscription.unsubscribe();
    this.selectionModeSubscription.unsubscribe();
  }
}
