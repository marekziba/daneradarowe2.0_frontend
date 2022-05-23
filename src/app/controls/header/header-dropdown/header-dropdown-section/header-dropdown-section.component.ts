import { Component, Input, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/ProductType.model';

@Component({
  selector: 'app-header-dropdown-section',
  templateUrl: './header-dropdown-section.component.html',
  styleUrls: ['./header-dropdown-section.component.scss']
})
export class HeaderDropdownSectionComponent implements OnInit {
  @Input() productGroup: ProductType;

  constructor() { }

  ngOnInit(): void {
  }

  disablePropagation(e: Event) {
    e.stopPropagation();
  }

}
