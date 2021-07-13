import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservoirService } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../../../agube-route';
import { NotificationService } from '@availa/notification';

@Component({
  selector: 'app-change-water-meter',
  templateUrl: './change-water-meter.component.html',
  styleUrls: ['./change-water-meter.component.scss'],
})
export class ChangeReservoirComponent implements OnInit {
  public userId: string;
  public idWaterMeter: number;
  public genericArray: any;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();
  public error = true;
  public errorMessage: any;

  constructor(
    private readonly svcReservoirService: ReservoirService,
    private readonly svcRouter: Router,
    private readonly svcActivate: ActivatedRoute,
    private readonly alertService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.svcActivate.queryParams.subscribe((params) => {
      this.idWaterMeter = params.data;
      this.userId = params.user_id;
      this.svcReservoirService
        .getReservoir(this.idWaterMeter)
        .subscribe((userAddress) => {
          this.svcReservoirService
            .getCurrentReservoirWaterMeter(+this.idWaterMeter)
            .subscribe((waterMeter) => {
              this.genericArray = {
                code: waterMeter.code,
                user: userAddress.full_address,
                capacity: userAddress.capacity,
                inlet_flow: userAddress.inlet_flow,
                outlet_flow: userAddress.outlet_flow,
              };
              this.formConfigurationData.emit(this.genericArray);
            });
        });
    });
  }

  public sendForm(event: any): void {
    this.svcReservoirService
      .changeCurrentReservoirWaterMeter(this.idWaterMeter, {
        code: event.code,
      })
      .subscribe(
        (value) => {
          this.alertService.success('Actualizado con éxito');
          setTimeout(() => {
            this.svcRouter.navigate([AgubeRoute.RESERVOIR]);
          },2000);
        },
        (error) => {
          this.error = false;
          this.errorMessage = error.error.message;
        }
      );
  }
}
