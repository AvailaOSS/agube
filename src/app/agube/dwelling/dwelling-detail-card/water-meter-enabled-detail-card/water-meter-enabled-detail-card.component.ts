import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  DwellingDetail,
  DwellingService,
  ManagerService,
} from '@availa/agube-rest-api';
import { iWaterMeterDetailCard } from './water-meter-enabled-detail-card';
import { Router } from '@angular/router';
import { AgubeRoute } from 'src/app/agube/agube-route';

@Component({
  selector: 'app-water-meter-enabled-detail-card',
  templateUrl: './water-meter-enabled-detail-card.component.html',
})
export class WaterMeterEnabledDetailCardComponent implements OnInit {
  // TODO: move to water-meter module
  @Input() public dwelling: DwellingDetail;
  public userId: string;
  public currentWaterMeter: iWaterMeterDetailCard;

  constructor(
    private readonly svcWelling: DwellingService,
    private readonly svcRouter: Router,
    private readonly svcManager: ManagerService
  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
    });
    this.currentWaterMeter = {
      water_meter_code: '',
      activation_date: '',
    };
  }

  public ngOnInit(): void {
    this.svcWelling
      .getCurrentDwellingWaterMeter(+this.dwelling.id!)
      .subscribe((value) => {
        this.currentWaterMeter = {
          water_meter_code: value.code,
          activation_date: value.release_date,
        };
      });
  }

  public changeCount(): void {
    this.svcRouter.navigate([AgubeRoute.CHANGE_WATER_METER], {
      queryParams: { data: this.dwelling.id, user_id: this.userId },
    });
  }
}
