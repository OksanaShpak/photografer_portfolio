import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrPromisesCheckerComponent } from './pr-promises-checker.component';

describe('PrPromisesCheckerComponent', () => {
  let component: PrPromisesCheckerComponent;
  let fixture: ComponentFixture<PrPromisesCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrPromisesCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrPromisesCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
