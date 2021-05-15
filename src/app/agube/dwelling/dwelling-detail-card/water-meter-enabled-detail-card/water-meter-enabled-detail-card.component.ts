import { Component, Input, OnInit } from '@angular/core';
import {
  DwellingDetail,
  DwellingService,
} from 'apiaux/agube-rest-api-lib/src/public-api';
import { iWaterMeterDetailCard } from './water-meter-enabled-detail-card';

@Component({
  selector: 'app-water-meter-enabled-detail-card',
  templateUrl: './water-meter-enabled-detail-card.component.html',
})
export class WaterMeterEnabledDetailCardComponent implements OnInit {
  // TODO: move to water-meter module
  @Input() public dWelling: DwellingDetail;
  public currentWaterMeter: iWaterMeterDetailCard;

  constructor(private readonly svcWelling: DwellingService) {}

  public ngOnInit(): void {
    this.currentWaterMeter = {
      water_meter_code: '',
      activation_date: '',
    };
  }
}
