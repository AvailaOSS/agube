import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'apiaux/subscription-rest-api-lib/src/lib/service/client.service';
import { PaymentTypesService } from 'apiaux/subscription-rest-api-lib/src/lib/service/paymentTypes.service';
import { SubscriptionService } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { first } from 'rxjs/operators';
import { PaymentType } from '../../../../apiaux/subscription-rest-api-lib/src/lib/model/paymentType';

@Component({
  selector: 'app-generic-forms',
  templateUrl: './generic-forms.component.html',
  styleUrls: ['./generic-forms.component.scss'],
})
export class GenericFormsComponent implements OnInit {
  hide = true;
  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public error: string;
  public formIdentification: number;
  public payType: string;
  public typePay: PaymentType[];
  requestSend: boolean;
  errorInformation: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subscriptionclientService: ClientService,
    private readonly subscription: SubscriptionService,
    private readonly paymentTypesService: PaymentTypesService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.formIdentification = params.id;
    });

    this.paymentTypesService.paymentTypesList().subscribe((value) => {
      this.typePay = (value);
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nif: ['', [Validators.required]],
      business_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      payment_type: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  public sendPayUrl(id: string): any {
    this.paymentTypesService.paymentTypesList().subscribe((typePay) => {
      typePay.map((type) => {
        if (type.description === id) {
          this.payType = type.id;
        }
      });
    });
  }
  public onSubmit(): void {
    this.submitted = true;
    console.log(this.registerForm.value);
    if (!this.registerForm.invalid) {
      this.subscriptionclientService
        .clientCreate({
          client: {
            user: {
              username: this.registerForm.value.username,
              first_name: this.registerForm.value.firstName,
              last_name: this.registerForm.value.lastName,
              email: this.registerForm.value.email,
            },
            nif: this.registerForm.value.nif,
            business_name: this.registerForm.value.business_name,
            phone_number: this.registerForm.value.phone_number,
            payment_type: +this.registerForm.value.payment_type.id,
          },
          subscription: this.formIdentification,
        })
        .subscribe((value) => {
          console.log(value);

          this.router.navigate(['/login'])
        },(error)=>{
          console.log(error)
        });
    } else {
      console.log('invalid', this.registerForm);
    }
  }
}
