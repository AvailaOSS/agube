import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { SubscriptionService } from '../../../../apiaux/subscription-rest-api-lib/src/lib/service/subscription.service';
import { ClientService } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public loginForm: FormGroup;
  public userId: string;
  public error = false;
  public errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private svcClientService: ClientService,
    private route: ActivatedRoute,
    private svcRouter: Router
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params.id;
    });
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }
  // tslint:disable-next-line: typedef
  get f() {
    return this.loginForm.controls;
  }
  public onSubmit(): void {
    if (this.loginForm.value.password1 !== this.loginForm.value.password2) {
      this.error = true;
      this.errorMessage = 'Las contraseñas tienen que ser iguales';
    } else {
      this.svcClientService
        .enableAccount({
          user_id: this.userId,
          password: this.loginForm.value.password1,
        })
        .subscribe(
          (value) => {
            this.svcRouter.navigate(['/login']);
          },
          (error) => {
            this.error = true;
            this.errorMessage = error;
          }
        );
    }
  }
}
