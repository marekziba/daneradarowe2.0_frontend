import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ProductGroup } from 'src/app/models/ProductGroup.model';
import { RadarMetadataService } from 'src/app/services/radar-metadata.service';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.scss']
})
export class HeaderDropdownComponent implements OnInit {

  @Input() isProductSelected: boolean;
  @Input() products: ProductGroup[];
  
  disablePropagation(e: Event) {
    e.stopPropagation();
  }

  ngOnInit(): void { }

}
