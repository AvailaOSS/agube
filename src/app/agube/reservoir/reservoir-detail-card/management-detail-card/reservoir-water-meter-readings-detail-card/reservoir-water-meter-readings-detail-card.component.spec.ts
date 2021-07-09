import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservoirWaterMeterReadingsDetailCardComponent } from './reservoir-water-meter-readings-detail-card.component';

describe('ReservoirWaterMeterReadingsDetailCardComponent', () => {
  let component: ReservoirWaterMeterReadingsDetailCardComponent;
  let fixture: ComponentFixture<ReservoirWaterMeterReadingsDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservoirWaterMeterReadingsDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservoirWaterMeterReadingsDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
