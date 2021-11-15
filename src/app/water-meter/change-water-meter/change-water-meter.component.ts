import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@availa/notification';
import { AgubeRoute } from 'src/app/agube-route';
import { WaterMeterType } from '../water-meter-type.enum';
import { WaterMeterManager } from '../water-meter.manager';

@Component({
  selector: 'app-change-water-meter',
  templateUrl: './change-water-meter.component.html',
  styleUrls: ['./change-water-meter.component.scss'],
})
export class ChangeWaterMeterComponent implements OnInit {
  @Input() title ? = 'Cambio de Contador';
  public waterMeterForm: FormGroup;
  public id: number;
  private type: WaterMeterType;

  constructor(
    private formBuilder: FormBuilder,
    private readonly activedRoute: ActivatedRoute,
    private readonly managerWaterMeter: WaterMeterManager,
    private readonly svcNotification: NotificationService,
    private readonly router: Router
  ) {
    this.activedRoute.queryParams.subscribe((params) => {
      this.id = +params.id;
      this.type = params.type;
    });
    this.waterMeterForm = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.managerWaterMeter
      .get(this.id, this.type)
      .subscribe((response) =>
        this.waterMeterForm.get('code').setValue(response.code)
      );
  }

  public onSubmit(): void {
    this.managerWaterMeter
      .change(this.id, this.waterMeterForm.value, this.type)
      .subscribe(
        (value) => {
          if (+this.type === +WaterMeterType.DWELLING) {
            this.router.navigate([AgubeRoute.DWELLING]);
          } else {
            this.router.navigate([AgubeRoute.RESERVOIR]);
          }
        },
        (error) =>
          this.svcNotification.error(
            'Error al actualizar ' + error.error.status
          )
      );
  }
}
