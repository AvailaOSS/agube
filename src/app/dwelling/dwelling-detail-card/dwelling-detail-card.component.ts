import { Component, Input, OnInit } from '@angular/core';
import { WaterMeterDetailCard } from 'src/app/contact-panel/contact-panel-detail-card/contact-panel-management/contact-water-meter-detail-card/water-meter-detail-card';
import { DwellingDetail } from '../../../../apiaux/agube-rest-api-lib/src/lib/model/dwellingDetail';
@Component({
  selector: 'app-dwelling-detail-card',
  templateUrl: './dwelling-detail-card.component.html',
  styleUrls: ['./dwelling-detail-card.component.scss'],
})
export class DWellingDetailCardComponent implements OnInit {
  @Input() DWelling: DwellingDetail | undefined;
  public sendWaterMeterCode: WaterMeterDetailCard;
  constructor() {}

  ngOnInit(): void {}

  public sendWater(event): void {
    this.sendWaterMeterCode = event;
  }
}
