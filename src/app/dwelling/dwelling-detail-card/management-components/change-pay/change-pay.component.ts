import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pay',
  templateUrl: './change-pay.component.html',
  styleUrls: ['./change-pay.component.scss']
})
export class ChangePayComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit(): void {
=======
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly svcChangePay: DwellingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.changePayId = params.data;
    });
    // this.svcChangePay.getPaymaster(this.changePayId).subscribe((value) => {
    //   this.formConfigurationData.emit(value);
    // });
    // this.svcChangePay.getCurrentOwner(+this.changePayId).subscribe((value) => {
    //   this.formConfigurationData.emit(value);
    // });

    this.svcChangePay.getCurrentResident(+this.changePayId).subscribe((value) => {
      this.formConfigurationData.emit(value);
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
>>>>>>> dedf782... fix: update new apis
  }

}
