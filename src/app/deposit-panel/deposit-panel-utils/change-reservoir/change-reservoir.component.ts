import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservoirService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-change-reservoir',
  templateUrl: './change-reservoir.component.html',
  styleUrls: ['./change-reservoir.component.scss'],
})
export class ChangeReservoirComponent implements OnInit {
  public user_id: string;
  public idWaterMeter: number;
  public genericArray: any;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();
  public error: boolean = true;
  public errorMessage: any;
  constructor(
    private readonly svcReservoirService: ReservoirService,
    private readonly svcRouter: Router,
    private readonly svcActivate: ActivatedRoute
  ) {
    this.svcActivate.queryParams.subscribe((params) => {
      this.idWaterMeter = params.data;
      this.user_id = params.user_id;
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

  public ngOnInit(): void {}
  public sendForm(event: any): void {
    this.svcReservoirService
      .changeCurrentReservoirWaterMeter(this.idWaterMeter, {
        code: event.code,
      })
      .subscribe(
        (value) => {
          this.svcRouter.navigate(['/depositos']);
        },
        (error) => {
          this.error = false;
          this.errorMessage = error;
        }
      );
  }
}
