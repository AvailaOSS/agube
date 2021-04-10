import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { DwellingService } from '../../../../../../apiaux/agube-rest-api-lib/src/lib/service/dwelling.service';
import { WaterMeterDetailCard } from './water-meter-detail-card';
import { DwellingDetail } from '../../../../../../apiaux/agube-rest-api-lib/src/lib/model/dwellingDetail';

@Component({
  selector: 'app-water-meter-detail-card',
  templateUrl: './water-meter-detail-card.component.html',
  styleUrls: ['./water-meter-detail-card.component.scss'],
})
export class WaterMeterDetailCardComponent implements OnInit, OnChanges {
  public currentWaterMeter: WaterMeterDetailCard;
  @Input() public DWelling: any;
  @Output() public sendWaterMeter: EventEmitter<WaterMeterDetailCard> = new EventEmitter();
  constructor(private readonly svcWelling: DwellingService) {}

  public ngOnChanges(): void {
    this.svcWelling
      .getCurrentDwellingWaterMeter(this.DWelling.id)
      .subscribe((value) => {
        this.currentWaterMeter = {
          code: value.code,
          activation_date: value.release_Date.split('T')[0],
        };
        this.sendWaterMeter.emit(this.currentWaterMeter)
      });
  }
  public ngOnInit(): void {
    this.currentWaterMeter = {
      code: '',
      activation_date: '',
    };
  }

}
