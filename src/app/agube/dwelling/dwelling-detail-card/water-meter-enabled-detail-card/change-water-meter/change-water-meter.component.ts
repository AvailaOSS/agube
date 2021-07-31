import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService, WaterMeter } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { AgubeRoute } from 'src/app/agube/agube-route';

@Component({
  selector: 'app-change-water-meter',
  templateUrl: './change-water-meter.component.html',
  styleUrls: ['./change-water-meter.component.scss'],
})
export class ChangeWaterMeterComponent implements OnInit {
  @Input() titleFormWaterMeter?: string = 'Cambio de Contador';
  public waterMeterFormGroup: FormGroup;
  public submitted = false;
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  public waterMeterId: string;
  public waterMeter: WaterMeter;
  public waterMeterCode: string;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly svcChangeWaterMeter: DwellingService,
    private readonly alertService: NotificationService,
    private readonly svcRouter: Router,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe((params) => {
      this.waterMeterId = params.data;
    });

    this.svcChangeWaterMeter
      .getCurrentDwellingWaterMeter(+this.waterMeterId)
      .subscribe((value) => {
        this.waterMeter = value;
        this.waterMeterCode = value.code;
      });
  }

  public ngOnInit(): void {
    this.waterMeterFormGroup = this.formBuilder.group({
      waterMeter: ['', Validators.required],
    });
  }
  get f() {
    return this.waterMeterFormGroup.controls;
  }
  public onSubmit(): void {
    this.svcChangeWaterMeter
      .changeCurrentDwellingWaterMeter(+this.waterMeterId, {
        code: this.waterMeterFormGroup.value.waterMeter,
      })
      .subscribe(
        (value) => {
          this.svcRouter.navigate([AgubeRoute.DWELLING]);
        },
        (error) => {
          this.alertService.error('Error al actualizad ' + error.error.status);
        }
      );
  }
}
