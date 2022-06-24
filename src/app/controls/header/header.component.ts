import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Image } from '../../models/Image.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Radar } from 'src/app/models/Radar.model';
import { RadarMetadataService } from 'src/app/services/radar-metadata.service';
import { ColorScale } from 'src/app/utils/ColorScale';
import { Store } from '@ngrx/store';
import { AppSelectors } from 'src/app/state/app.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedRadar$: Observable<Radar>;
  colorScale$: Observable<ColorScale>;
  currentImage$: Observable<Image>;

  // private imageSubscription = new Subscription();
  private dataSubscription = new Subscription();

  @ViewChild('scaleTooltip') tooltip: ElementRef;

  constructor(
    private store: Store,
    private metadataService: RadarMetadataService
  ) { }

  disablePropagation(e) {
    e.stopPropagation();
  }

  ngOnInit(): void {
    this.selectedRadar$ =this.store.select(AppSelectors.getSelectedRadar);
    this.colorScale$ = this.metadataService.getColorScaleObservable();

    // this.imageSubscription = this.metadataService.imageChanged.subscribe(
    //   (image: Image) => {
    //     console.log('we have a new image in header');
    //     this.currentImage = image;
    //   }
    // );

    // this.controlsService.selectionModeChanged.subscribe((e) => console.log(e));
    
    // window.onmousemove = function (e) {
    //     var x = e.clientX,
    //         y = e.clientY;
    //     tooltipSpan.style.top = (y + 20) + 'px';
    //     tooltipSpan.style.left = (x + 20) + 'px';
    // };
  }

  selectionModeToggle(){
    // const currentMode = this.controlsService.selectionMode;
    // this.controlsService.setSelectionMode(!currentMode);
  }
}
