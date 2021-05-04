import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { WaterMeterDetailCard } from './water-meter-enabled-detail-card';

@Component({
  selector: 'app-water-meter-enabled-detail-card',
  templateUrl: './water-meter-enabled-detail-card.component.html',
})
export class WaterMeterEnabledDetailCardComponent implements OnInit, OnChanges {
  // TODO: move to water-meter module
  public currentWaterMeter: WaterMeterDetailCard;
  @Input() public DWelling: any;
  @Output()
  public sendWaterMeter: EventEmitter<WaterMeterDetailCard> = new EventEmitter();

  constructor(private readonly svcWelling: DwellingService) {}

  public ngOnChanges(): void {
    this.svcWelling
      .getCurrentDwellingWaterMeter(this.DWelling.id)
      .subscribe((value) => {
        this.currentWaterMeter = {
          code: value.code,
          activation_date: value.release_date.split('T')[0],
        };
        this.sendWaterMeter.emit(this.currentWaterMeter);
      });
  }

  public ngOnInit(): void {
    this.currentWaterMeter = {
      code: '',
      activation_date: '',
    };
  }
}
