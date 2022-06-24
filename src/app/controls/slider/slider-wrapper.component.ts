import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slider-wrapper',
  templateUrl: './slider-wrapper.component.html',
  styleUrls: ['./slider-wrapper.component.scss']
})
export class SliderWrapperComponent implements OnInit {
  currentImageId$: Observable<number>;

  constructor() { }

  ngOnInit(): void {
  }

}
