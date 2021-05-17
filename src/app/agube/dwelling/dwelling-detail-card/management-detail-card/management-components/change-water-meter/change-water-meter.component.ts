import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../../../../agube-route';

@Component({
  selector: 'app-change-water-meter',
  templateUrl: './change-water-meter.component.html',
  styleUrls: ['./change-water-meter.component.scss'],
})
export class ChangeWaterMeterComponent implements OnInit {
  public waterMeterId: string;
  public error = true;
  public errorMessage: string;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly svcChangeWaterMeter: DwellingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.waterMeterId = params.data;
    });

    this.svcChangeWaterMeter
      .getCurrentDwellingWaterMeter(+this.waterMeterId)
      .subscribe((value) => {
        console.log(value);
        this.formConfigurationData.emit(value);
      });
  }

  public ngOnInit(): void {}

  public sendForm(event: any): void {
    this.svcChangeWaterMeter
      .changeCurrentDwellingWaterMeter(+this.waterMeterId, {
        code: event.code,
      })
      .subscribe(
        (value) => this.router.navigate([AgubeRoute.DWELLING]),
        (error) => {
          this.error = false;
          this.errorMessage = error;
        }
      );
  }
}
