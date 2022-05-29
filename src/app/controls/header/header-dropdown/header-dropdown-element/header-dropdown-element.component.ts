import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ProductVariant } from 'src/app/models/ProductVariant.model';

@Component({
  selector: 'app-header-dropdown-element',
  templateUrl: './header-dropdown-element.component.html',
  styleUrls: ['./header-dropdown-element.component.scss']
})
export class HeaderDropdownElementComponent implements OnInit {
  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

  disablePropagation(e: Event) {
    e.stopPropagation();
  }
}
