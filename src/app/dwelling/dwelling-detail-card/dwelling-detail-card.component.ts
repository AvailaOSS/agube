import { Component, Input, OnInit } from '@angular/core';
import { DwellingDetail } from 'apiaux/agube-rest-api-lib/src/public-api';
import { WaterMeterEnabledDetailCardComponent } from './water-meter-enabled-detail-card/water-meter-enabled-detail-card.component';

@Component({
  selector: 'app-dwelling-detail-card',
  templateUrl: './dwelling-detail-card.component.html',
})
export class DwellingDetailCardComponent implements OnInit {
  @Input() dwelling: DwellingDetail | undefined;
  public sendWaterMeterCode: WaterMeterEnabledDetailCardComponent;

  constructor() {}

  ngOnInit(): void {}

  public sendWater(event: any): void {
    this.sendWaterMeterCode = event;
  }
}
