import { Component, Input, OnInit } from '@angular/core';
import {
  DwellingService,
  ManagerService,
  WaterMeter,
} from '@availa/agube-rest-api';
import { Router } from '@angular/router';
import { AgubeRoute } from 'src/app/agube/agube-route';

@Component({
  selector: 'app-water-meter-enabled-detail-card',
  templateUrl: './water-meter-enabled-detail-card.component.html',
})
export class WaterMeterEnabledDetailCardComponent implements OnInit {
  // TODO: move to water-meter module

  @Input() public dwellingId: number;
  public waterMeter: WaterMeter;
  public userId: string;

  constructor(
    private readonly svcDwelling: DwellingService,
    private readonly svcRouter: Router,
    private readonly svcManager: ManagerService
  ) {
    //
  }

  public ngOnInit(): void {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
    });
    this.svcDwelling.getCurrentDwellingWaterMeter(this.dwellingId).subscribe(result => this.waterMeter = result);
  }

  public changeCount(): void {
    this.svcRouter.navigate([AgubeRoute.CHANGE_WATER_METER], {
      queryParams: { data: this.dwellingId },
    });
  }
}
