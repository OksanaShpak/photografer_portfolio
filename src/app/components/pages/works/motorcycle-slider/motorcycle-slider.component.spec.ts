import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleSliderComponent } from './motorcycle-slider.component';

describe('MotorcycleSliderComponent', () => {
  let component: MotorcycleSliderComponent;
  let fixture: ComponentFixture<MotorcycleSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorcycleSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcycleSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
