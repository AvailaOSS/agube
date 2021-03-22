import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingPlaceWaterMeterReadingsComponent } from './living-place-water-meter-readings.component';

describe('LivingPlaceWaterMeterReadingsComponent', () => {
  let component: LivingPlaceWaterMeterReadingsComponent;
  let fixture: ComponentFixture<LivingPlaceWaterMeterReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivingPlaceWaterMeterReadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingPlaceWaterMeterReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
