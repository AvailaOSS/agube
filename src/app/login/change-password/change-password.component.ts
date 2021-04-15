import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../apiaux/auth-rest-api-lib/src/lib/service/user.service';

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
    private svcClientService: UserService,
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
          confirm_password: this.loginForm.value.password2,
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
