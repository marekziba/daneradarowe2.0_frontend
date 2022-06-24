import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() value: number;

  options: Options = {
    floor: 0,
    ceil: 250
  };

  @Output() valueChanged = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(v: number){
    this.valueChanged.emit(v);
  }
}
