import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotograferPageComponent } from './photografer-page.component';

describe('PhotograferPageComponent', () => {
  let component: PhotograferPageComponent;
  let fixture: ComponentFixture<PhotograferPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotograferPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotograferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
