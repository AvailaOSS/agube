import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DwellingService, WaterMeter } from '@availa/agube-rest-api';
import { Router } from '@angular/router';
import { AgubeRoute } from 'src/app/agube/agube-route';

@Component({
  selector: 'app-water-meter-enabled-detail-card',
  templateUrl: './water-meter-enabled-detail-card.component.html',
  styleUrls: ['./water-meter-enabled-detail-card.component.scss'],
})
export class WaterMeterEnabledDetailCardComponent implements OnInit, OnChanges {
  // TODO: move to water-meter module

  @Input() public dwellingId: number;
  public waterMeter: WaterMeter | undefined;

  constructor(
    private readonly svcDwelling: DwellingService,
    private readonly svcRouter: Router
  ) {
    //
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }

  public ngOnInit(): void {
    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.dwellingId)
      .subscribe((result) => (this.waterMeter = result));
  }

  public changeCount(): void {
    this.svcRouter.navigate([AgubeRoute.CHANGE_WATER_METER], {
      queryParams: { data: this.dwellingId },
    });
  }
}
