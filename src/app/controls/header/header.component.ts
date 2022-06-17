import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Image } from '../../models/Image.model';
import { Subscription } from 'rxjs';
import { Radar } from 'src/app/models/Radar.model';
import { RadarMetadataService } from 'src/app/services/radar-metadata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectedRadar: Radar;
  colorScale: string[] = [];
  currentImage: Image;

  private screenWidth: number;

  private imageSubscription = new Subscription();
  private dataSubscription = new Subscription();

  @ViewChild('scaleTooltip') tooltip: ElementRef;

  constructor(
    private metadataService: RadarMetadataService
  ) {
    this.onResize();
  }

  disablePropagation(e) {
    e.stopPropagation();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
     this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.dataSubscription = this.metadataService.getSelectedRadar().subscribe(
      (radar: Radar) => {
        this.selectedRadar = radar;
      }
    )

    this.imageSubscription = this.metadataService.imageChanged.subscribe(
      (image: Image) => {
        console.log('we have a new image in header');
        this.currentImage = image;
      }
    );

    // this.controlsService.selectionModeChanged.subscribe((e) => console.log(e));

    this.colorScale = this.metadataService.getColorScale();
    // window.onmousemove = function (e) {
    //     var x = e.clientX,
    //         y = e.clientY;
    //     tooltipSpan.style.top = (y + 20) + 'px';
    //     tooltipSpan.style.left = (x + 20) + 'px';
    // };
  }

  moveTooltip(e) {
    const x = e.clientX;
    // this.tooltip.nativeElement.style.top = (y + 20) + 'px';
    const distance = 2;
    if(x > 60 + distance && x < this.screenWidth - 60 - distance){
      this.tooltip.nativeElement.style.left = (x) + 'px';
    }
    else if(x < 60 + distance){
      this.tooltip.nativeElement.style.left = `${60 + distance}px`;
    }
    else if(x > this.screenWidth - 60 - distance) {
      this.tooltip.nativeElement.style.left = (this.screenWidth - 60 - distance) + 'px';
    }
    this.tooltip.nativeElement.style.backgroundColor = this.colorScale[Math.floor(x / (this.screenWidth / this.colorScale.length))];
    this.tooltip.nativeElement.textContent = `${Math.floor((x / ( (this.screenWidth - this.screenWidth/this.colorScale.length) / 111.4) - 31.5)*10)/10} dBZ`;
    // this.tooltip.nativeElement.textContent = `${Math.round((x / ( (this.screenWidth) / 90) - 45)*10)/10} m/s`;
  }

  selectionModeToggle(){
    const currentMode = this.controlsService.selectionMode;
    this.controlsService.setSelectionMode(!currentMode);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.imageSubscription.unsubscribe();
  }
}
