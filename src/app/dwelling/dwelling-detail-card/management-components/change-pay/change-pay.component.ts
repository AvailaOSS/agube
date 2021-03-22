import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-change-pay',
  templateUrl: './change-pay.component.html',
  styleUrls: ['./change-pay.component.scss'],
})
export class ChangePayComponent implements OnInit {
  public addNewWelling: FormGroup;
  public formIdentification: number;
  public changePayId: string;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private readonly svcChangePay: DwellingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.changePayId = params.data;
    });
    this.svcChangePay.getPaymaster(this.changePayId).subscribe((value) => {
      this.formConfigurationData.emit(value);
    });
    this.svcChangePay.getCurrentOwner(+this.changePayId).subscribe((owner) => {
      console.log(owner);
    });

    this.svcChangePay
      .getCurrentResident(+this.changePayId)
      .subscribe((value) => {
        console.log('residente', value);
      });
  }

  public ngOnInit(): void {}
  public sendForm(event: any): void {
    console.log('change pay', event);
    // this.svcChangePay
    //   .changeCurrentWaterMeter(+this.changePayId, {
    //     user: event.username,
    //     releaseDate: '222',
    //     dischargeDate: null,
    //     dwellingId: +this.changePayId,
    //   })
    //   .subscribe((value) => {
    //     console.log(value);
    //   });
  }
}
