import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductType } from 'src/app/models/ProductType.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.scss']
})
export class HeaderDropdownComponent implements OnInit {

  @Input() isProductSelected: boolean;

  products: ProductType[];

  dataSubscription: Subscription;

  constructor(private dataService: DataService) { }
  
  disablePropagation(e: Event) {
    e.stopPropagation();
  }

  ngOnInit(): void {
    this.dataSubscription = this.dataService.getProducts().subscribe(
      (products: ProductType[]) => {
        this.products = products
      }
    )
  }

}
