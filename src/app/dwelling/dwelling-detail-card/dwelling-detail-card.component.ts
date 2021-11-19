import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DwellingCreate, DwellingService } from '@availa/agube-rest-api';
import { WaterMeterReadingSetterComponent } from '../../water-meter/water-meter-reading-setter/water-meter-reading-setter.component';
import { WaterMeterType } from '../../water-meter/water-meter-type.enum';

@Component({
  selector: 'app-dwelling-detail-card',
  templateUrl: './dwelling-detail-card.component.html',
  styleUrls: ['./dwelling-detail-card.component.scss'],
})
export class DwellingDetailCardComponent implements OnInit, OnChanges {
  @Input() public dwellingId: number;
  public parentType: WaterMeterType;
  public dwelling: DwellingCreate | undefined;
  public sendWaterMeterCode: WaterMeterReadingSetterComponent;

  constructor(private readonly svcDwelling: DwellingService) {
    this.parentType = WaterMeterType.DWELLING;
  }

  ngOnInit(): void {
    this.svcDwelling
      .getDwelling(this.dwellingId)
      .subscribe((result) => (this.dwelling = result));
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }

  public sendWater(event: any): void {
    this.sendWaterMeterCode = event;
  }
}
