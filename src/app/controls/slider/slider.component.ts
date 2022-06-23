import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  constructor() { }

  ngOnInit(): void {
  }

}
