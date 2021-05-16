import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRoute } from '@availa/auth-fe';
import { ClientService } from 'apiaux/subscription-rest-api-lib/src/lib/service/client.service';
import { PaymentTypesService } from 'apiaux/subscription-rest-api-lib/src/lib/service/paymentTypes.service';
import {
  PaymentType,
  SubscriptionService,
} from 'apiaux/subscription-rest-api-lib/src/public-api';
import { Subscription } from '../../../../apiaux/subscription-rest-api-lib/src/lib/model/subscription';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
})
export class CreateAccountFormComponent implements OnInit {
  public registerForm: FormGroup;
  public formIdentification: number;
  public payType: string;
  public typePay: PaymentType[];
  public subscriptions: any;
  public selectedList = false;
  public error = false;
  public errorMessage: string;
  public success: boolean = false;
  public login: string = AuthRoute.LOGIN;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly subscriptionclientService: ClientService,
    private readonly svcSubscriptionService: SubscriptionService,
    private readonly paymentTypesService: PaymentTypesService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.formIdentification = params.id;
    });

    this.paymentTypesService.getPaymentTypes().subscribe((value) => {
      this.typePay = value;
    });

    this.svcSubscriptionService.getSubscriptions().subscribe((subs) => {
      this.subscriptions = subs;
    });
  }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      nif: ['', [Validators.required]],
      business_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      payment_type: ['', Validators.required],
    });
  }

  // tslint:disable-next-line: typedef
  get f() {
    return this.registerForm.controls;
  }

  public onSubmit(): void {
    this.subscriptionclientService
      .createDwellingWithResident({
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
          payment_type: this.registerForm.value.payment_type,
        },
        subscription: this.formIdentification,
      })
      .subscribe(
        (value) => {
          this.router.navigate([AuthRoute.LOGIN]);
          this.success = true;
          this.error = false;
        },
        (error) => {
          this.error = true;
          this.success = false;
          this.errorMessage = error.statusText;
        }
      );
  }

  public selectedSubscription(subs: Subscription): void {
    this.formIdentification = +subs.id;
  }

  public backToLogin(): void {
    this.router.navigate([AuthRoute.LOGIN]);
  }
}
