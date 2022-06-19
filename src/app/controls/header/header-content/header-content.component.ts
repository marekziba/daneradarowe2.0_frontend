import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Radar } from 'src/app/models/Radar.model';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {
  @Input() selectedRadar: Radar;

  @Output() selectionModeToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionModeToggle() {
    this.selectionModeToggle.emit();
  }
}
