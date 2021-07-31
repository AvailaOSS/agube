import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservoirService, WaterMeter } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../../../agube-route';
import { NotificationService } from '@availa/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-water-meter',
  templateUrl: './change-water-meter.component.html',
  styleUrls: ['./change-water-meter.component.scss'],
})
export class ChangeReservoirComponent implements OnInit {
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
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();
  public error = true;
  public errorMessage: any;

  constructor(
    private readonly svcReservoirService: ReservoirService,
    private readonly svcRouter: Router,
    private readonly svcActivate: ActivatedRoute,
    private readonly alertService: NotificationService,
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.waterMeterId = params.data;
    });
    this.svcReservoirService
      .getCurrentReservoirWaterMeter(+this.waterMeterId)
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
    this.svcReservoirService
      .changeCurrentReservoirWaterMeter(+this.waterMeterId, {
        code: this.waterMeterFormGroup.value.waterMeter,
      })
      .subscribe(
        (value) => {
          this.svcRouter.navigate([AgubeRoute.RESERVOIR]);
        },
        (error) => {
          this.alertService.error('Error al actualizar ' + error.error.status);
        }
      );
  }
}
