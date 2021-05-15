import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionRoute } from '../../subscription/subscription-route';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public subscription: string = SubscriptionRoute.SUBSCRIPTION;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // tslint:disable-next-line: typedef
  get f() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.login(this.f.username.value, this.f.password.value);
  }
}
