import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/Image.model';
import { AppActions } from 'src/app/state/app.actions';
import { AppSelectors } from 'src/app/state/app.selector';

@Component({
  selector: 'app-slider-wrapper',
  templateUrl: './slider-wrapper.component.html',
  styleUrls: ['./slider-wrapper.component.scss']
})
export class SliderWrapperComponent implements OnInit {
  currentImageId$: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentImageId$ = this.store.select(AppSelectors.getCurrentImageId)
  }

  changeImageId(id: number){
    this.store.dispatch(AppActions.setCurrentImageId({ id }));
  }
}
