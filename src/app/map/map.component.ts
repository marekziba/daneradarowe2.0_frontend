import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Feature, Map, Overlay, View } from 'ol';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, transformExtent } from 'ol/proj';
import OSM from 'ol/source/OSM';
import Static from 'ol/source/ImageStatic';
import { imageOverlay } from 'leaflet';
import { LocationService } from '../services/location.service';
import { Location } from '../models/Location.model';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Point } from 'ol/geom';
import {Style, Icon} from 'ol/style';
import { DataService } from '../services/data.service';
import ImageSource from 'ol/source/Image';
import { Image } from '../models/Image.model';
import { RadarsService } from '../services/radars.service';
import { Radar } from '../models/Radar.model';
import { DOMElementFactory } from '../utils/DOMElementFactory';
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

  private map: Map;
  private imageSource: Static;
  private imageLayer: ImageLayer<Static>;
  private markerLayer: VectorLayer<VectorSource>;
  private vectorSource: VectorSource;
  private iconFeature: Feature;

  public radars: Radar[] = [];

  @ViewChildren("radarMarker") markerRef: QueryList<ElementRef>;

  constructor(
    private locationService: LocationService, 
    private dataService: DataService,
    private radarsService: RadarsService
    ) { }

  ngOnInit(): void {
    this.initializeMap();
    this.initializeGeolocation();

    this.dataSubscription = this.dataService.dataSource.pipe(
      map((images: Image[]) => {
        return images.map(
          (image: Image) => new Static({
            interpolate: false,
            url: "https://daneradarowe.pl" + image.url,
            imageExtent: transformExtent([19.076708813633406, 51.26792366474811, 22.83757981873387, 53.523962192314826], 'EPSG:4326', 'EPSG:3857')
          })
        )
      })
    ).subscribe(
      (images: Static[]) => {
        console.log("new image scan arrived")
        if(images[0].getUrl() !== this.imageLayer.getSource().getUrl()){
          this.addImage(images[0]);
        }
      }
    );
  }

  private initializeMap(): void {
    this.map = new Map({
      view: new View({
        center: fromLonLat([19.4803, 52.0693]),
        zoom: 7,
        constrainResolution: true
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      pixelRatio: 1
    });
    
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

    this.imageSource = new Static({
      interpolate: false,
      url: '',
      imageExtent: transformExtent([11.812900, 56.186500, 25.157600, 48.133400], 'EPSG:4326', 'EPSG:3857')
    });

    this.imageLayer = new ImageLayer({
      source: this.imageSource,
      opacity: 0.8
    });

    this.map.addLayer(this.imageLayer);

    this.radarsService.subject.subscribe(
      (radars: Radar[]) => {
        this.radars = radars;
      }
    );
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

  switchRadar(radar: Radar) {
    console.log(radar.codeName)
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
  }
}
