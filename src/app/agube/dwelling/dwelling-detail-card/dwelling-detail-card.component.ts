import { Component, Input } from '@angular/core';
import { DwellingDetail } from '@availa/agube-rest-api';
import { WaterMeterEnabledDetailCardComponent } from './water-meter-enabled-detail-card/water-meter-enabled-detail-card.component';

@Component({
  selector: 'app-dwelling-detail-card',
  templateUrl: './dwelling-detail-card.component.html',
})
export class DwellingDetailCardComponent {
  @Input() dwelling: DwellingDetail;

  public sendWaterMeterCode: WaterMeterEnabledDetailCardComponent;

  constructor() {
    //
  }

  public sendWater(event: any): void {
    this.sendWaterMeterCode = event;
  }
}
