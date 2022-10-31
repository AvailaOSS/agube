import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConfiguration } from '../auth.configuration';
import { isEdge } from '../edge-detector';
import { AccountService } from './service/account.service';

@Component({
    selector: 'lib-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    public hidePassword: boolean = true;
    public loginForm: FormGroup;
    public username = new FormControl('', Validators.compose([Validators.required]));
    public password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]);

    public isEdge = isEdge();

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private authService: AuthConfiguration,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.loginForm = this.formBuilder.group({
            username: this.username,
            password: this.password,
        });
    }

    public doLogin(): void {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.accountService.login(
            this.loginForm.value.username,
            this.loginForm.value.password,
            this.authService.afterLoginSuccessUrl
        );
    }

    public createAccount() {
        this.router.navigate([this.authService.createAccountUrl]);
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'username':
                if (this.username.hasError('required')) {
                    return 'LOGIN.USERNAME.VALIDATION';
                }
                return '';
            case 'password':
                if (this.password.hasError('required')) {
                    return 'LOGIN.PASSWORD.VALIDATION.REQUIRED';
                }
                if (this.password.hasError('minlength')) {
                    return 'LOGIN.PASSWORD.VALIDATION.MINLENGTH';
                }
                if (this.password.hasError('maxlength')) {
                    return 'LOGIN.PASSWORD.VALIDATION.MAXLENGTH';
                }
                return '';
            default:
                return '';
        }
    }
}
