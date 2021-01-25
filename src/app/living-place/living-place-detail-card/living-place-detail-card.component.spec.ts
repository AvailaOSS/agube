import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingPlaceDetailCardComponent } from './living-place-detail-card.component';

describe('LivingPlaceDetailCardComponent', () => {
  let component: LivingPlaceDetailCardComponent;
  let fixture: ComponentFixture<LivingPlaceDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivingPlaceDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingPlaceDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
