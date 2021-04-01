import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { AccountService } from '../../../../login/service/account.service';

@Component({
  selector: 'app-change-pay',
  templateUrl: './change-pay.component.html',
  styleUrls: ['./change-pay.component.scss'],
})
export class ChangePayComponent implements OnInit {
  public addNewWelling: FormGroup;
  public formIdentification: number;
  public username: string;
  public changePayId: string;
  public error: boolean = true;
  public paymaster: any;
  public owner: any;
  public resident: any;
  public selectRow: any;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private readonly svcChangePay: DwellingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.changePayId = params.data;
    });
  }

  public selectedRow(event): void {
    console.log(event);
    this.selectRow = event;
  }
  public ngOnInit(): void {
    this.svcChangePay.getPaymaster(this.changePayId).subscribe((value) => {
      console.log(Object.entries(value)[3]);
      this.paymaster = Object.entries(value)[3][1];
      this.formConfigurationData.emit(value);
    });
    this.svcChangePay.getCurrentOwner(+this.changePayId).subscribe((owner) => {
      this.owner = Object.entries(owner)[2][1]['username'];
    });

    this.svcChangePay
      .getCurrentResident(+this.changePayId)
      .subscribe((value) => {
        console.log('residente', value);
        this.resident = Object.entries(value)[2][1]['username'];
      });
  }
  public sendForm(event: any): void {
    console.log('change pay', event);

    this.error = false;
    this.svcChangePay
      .changePaymaster(this.changePayId, {
        username: this.selectRow,
        iban: event.numberBank,
        payment_type: 'BANK',
      })
      .subscribe(
        (value) => {
          console.log(value);
        },
        (error) => {
          this.error = false;
        }
      );
  }
}
