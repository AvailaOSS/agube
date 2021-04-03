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
  public user_id: string;
  constructor(
    private formBuilder: FormBuilder,
    private svcClientService: ClientService,
    private route: ActivatedRoute,
    private svcRouter: Router
  ) {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.user_id = params.id;
    });
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  public onSubmit(): void {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm);
    this.svcClientService
      .enableAccount({
        user_id: this.user_id,
        password: this.loginForm.value.password1,
      })
      .subscribe((value) => {
        this.svcRouter.navigate(['/login']);
      });
  }
}
