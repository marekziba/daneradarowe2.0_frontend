import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColorScale } from 'src/app/utils/ColorScale';

@Component({
  selector: 'app-header-scale',
  templateUrl: './header-scale.component.html',
  styleUrls: ['./header-scale.component.scss']
})
export class HeaderScaleComponent implements OnInit {
  @Input() colors: string[];
  @Output() mouseMove = new EventEmitter<any>();

  @ViewChild('scaleTooltip') tooltip: ElementRef;

  private screenWidth: number;

  constructor() { }

  ngOnInit(): void {
    this.onResize();
  } 

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
     this.screenWidth = window.innerWidth;
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
    this.tooltip.nativeElement.style.backgroundColor = this.colors[Math.floor(x / (this.screenWidth / this.colors.length))];
    this.tooltip.nativeElement.textContent = `${Math.floor((x / ( (this.screenWidth - this.screenWidth/this.colors.length) / 111.4) - 31.5)*10)/10} dBZ`;
    // this.tooltip.nativeElement.textContent = `${Math.round((x / ( (this.screenWidth) / 90) - 45)*10)/10} m/s`;
  }
}
