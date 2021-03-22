import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DWellingWaterMeterReadingsComponent } from './dwelling-water-meter-readings.component';

describe('DWellingWaterMeterReadingsComponent', () => {
  let component: DWellingWaterMeterReadingsComponent;
  let fixture: ComponentFixture<DWellingWaterMeterReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DWellingWaterMeterReadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DWellingWaterMeterReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
