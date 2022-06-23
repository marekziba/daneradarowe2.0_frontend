import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderControlsComponent } from './slider-controls.component';

describe('SliderControlsComponent', () => {
  let component: SliderControlsComponent;
  let fixture: ComponentFixture<SliderControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
