import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Feature, Map, Overlay, View } from 'ol';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, transform, transformExtent } from 'ol/proj';
import OSM from 'ol/source/OSM';
import Static from 'ol/source/ImageStatic';
import { circle, imageOverlay } from 'leaflet';
import { LocationService } from '../services/location.service';
import { Location } from '../models/Location.model';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
<<<<<<< HEAD
import { Point, Polygon } from 'ol/geom';
import {Style, Icon, Stroke, Fill} from 'ol/style';
=======
import { Circle, Point } from 'ol/geom';
import {Style, Icon, Stroke} from 'ol/style';
>>>>>>> de943851fd208df565151e372895deee39533a09
import { DataService } from '../services/data.service';
import ImageSource from 'ol/source/Image';
import { Image } from '../models/Image.model';
import { RadarsService } from '../services/radars.service';
import { Radar } from '../models/Radar.model';
import { DOMElementFactory } from '../utils/DOMElementFactory';
import { circular } from 'ol/geom/Polygon';
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

<<<<<<< HEAD
  private polygon: Polygon;
  private polygonFeature: Feature;
  private polygonSource: VectorSource;
  private polygonLayer: VectorLayer<VectorSource>;
=======
  private rangeCircle: Circle;
  private circleFeature: Feature;
  private circleSource: VectorSource;
  private circleLayer: VectorLayer<VectorSource>;
>>>>>>> de943851fd208df565151e372895deee39533a09

  public radars: Radar[] = [];
  public selectedRadar: Radar = undefined;

  public selectionModeEnabled: boolean = true;

  @ViewChildren("radarMarker") markerRef: QueryList<ElementRef>;

  constructor(
    private locationService: LocationService, 
    private dataService: DataService,
    private radarsService: RadarsService
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

<<<<<<< HEAD
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
      pixelRatio: 4
    });
    
=======
  private initializeMarkerLayer(){
>>>>>>> de943851fd208df565151e372895deee39533a09
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
  }

  private initializeImageLayer(){
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
<<<<<<< HEAD

    this.radarsService.subject.subscribe(
      (radars: Radar[]) => {
        this.radars = radars;
      }
    );

    this.polygon = new Polygon([[
      [-180.0, 90.0],
      [180.0, 90.0],
      [180.0, -90.0],
      [-180.0, -90.0]
    ]]);

    const circlePolygon = circular([20.960911, 52.405219], 125250, 720);

    console.log(circlePolygon.getLinearRing(0).transform('EPSG:4326', 'EPSG:3857'));

    this.polygon.appendLinearRing(circlePolygon.getLinearRing(0));

    this.polygon.transform('EPSG:4326', 'EPSG:3857').translate(0, 500);

    // this.polygon = circlePolygon;

    this.polygonFeature = new Feature(this.polygon);

    this.polygonSource = new VectorSource({
      features: [this.polygonFeature]
    });

    const polygonStyle = new Style({
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.4)',
        width: 0
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0.4)'
      })
    })

    this.polygonLayer = new VectorLayer({
      source: this.polygonSource,
      style: polygonStyle
    });

    this.map.addLayer(this.polygonLayer);
=======
>>>>>>> de943851fd208df565151e372895deee39533a09
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
    console.log(radar.codeName);
    this.selectedRadar = radar;
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
