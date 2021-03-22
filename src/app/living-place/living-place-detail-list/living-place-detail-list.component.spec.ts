import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingPlaceDetailListComponent } from './living-place-detail-list.component';

describe('LivingPlaceDetailListComponent', () => {
  let component: LivingPlaceDetailListComponent;
  let fixture: ComponentFixture<LivingPlaceDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivingPlaceDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingPlaceDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
