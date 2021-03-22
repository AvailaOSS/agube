import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterMeterDetailCardComponent } from './water-meter-detail-card.component';

describe('WaterMeterDetailCardComponent', () => {
  let component: WaterMeterDetailCardComponent;
  let fixture: ComponentFixture<WaterMeterDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterMeterDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterMeterDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
