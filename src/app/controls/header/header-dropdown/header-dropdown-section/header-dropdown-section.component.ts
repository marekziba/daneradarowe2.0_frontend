import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ProductGroup } from 'src/app/models/ProductGroup.model';

@Component({
  selector: 'app-header-dropdown-section',
  templateUrl: './header-dropdown-section.component.html',
  styleUrls: ['./header-dropdown-section.component.scss']
})
export class HeaderDropdownSectionComponent implements OnInit {
  @Input() productGroup: ProductGroup;

  constructor() { }

  ngOnInit(): void {
  }

  disablePropagation(e: Event) {
    e.stopPropagation();
  }

}
