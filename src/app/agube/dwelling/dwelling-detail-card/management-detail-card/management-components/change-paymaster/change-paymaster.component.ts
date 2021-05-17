import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../../../../agube-route';

@Component({
  selector: 'app-change-paymaster',
  templateUrl: './change-paymaster.component.html',
  styleUrls: ['./change-paymaster.component.scss'],
})
export class ChangePaymasterComponent implements OnInit {
  public registerForm: FormGroup;
  public username: string;
  public changePayId: string;
  public paymaster: any;
  public owner: any;

  public addressOwn: any;
  public phoneOwn: any;
  public resident: any;

  public addressRes: any;
  public phoneRes: any;
  public selectRow: any;
  public iban: any;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private readonly svcChangePay: DwellingService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.changePayId = params.data;
    });
    this.registerForm = this.formBuilder.group({
      numberBank: new FormControl(),
    });
  }

  public ngOnInit(): void {
    this.svcChangePay.getPaymaster(this.changePayId).subscribe((value) => {
      this.iban = Object.entries(value)[2][1];
      this.paymaster = Object.entries(value)[3][1];
      this.registerForm.get('numberBank').setValue(this.iban);
    });
    this.svcChangePay.getCurrentOwner(+this.changePayId).subscribe((owner) => {
      this.owner = Object.entries(owner)[2][1]['username'];
      this.addressOwn =
        Object.entries(owner)[2][1]['address'][0].address.street;
      this.phoneOwn = Object.entries(owner)[2][1]['phones'][0].phone_number;
    });

    this.svcChangePay
      .getCurrentResident(+this.changePayId)
      .subscribe((value) => {
        this.resident = Object.entries(value)[2][1]['username'];
        this.addressRes =
          Object.entries(value)[2][1]['address'][0].address.street;
        this.phoneRes = Object.entries(value)[2][1]['phones'][0].phone_number;
      });
  }

  public onSubmit(): void {
    this.svcChangePay
      .changePaymaster(this.changePayId, {
        payment_type: 'BANK',
        iban: this.registerForm.value.numberBank,
        username: this.selectRow,
      })
      .subscribe(
        (value) => {
          this.ngOnInit();
          this.router.navigate([AgubeRoute.DWELLING]);
        },
        (error) => {
          // FIXME: throw Notification Service
          console.log('error');
        }
      );
  }

  public selectedRow(event): void {
    this.selectRow = event;
  }

  public goToControlPanel(): void {
    this.router.navigate([AgubeRoute.DWELLING]);
  }
}
