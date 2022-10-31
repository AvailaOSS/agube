import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { AuthRoute } from '../auth-route';
import { isEdge } from '../edge-detector';
import { passwordMatches } from './password-validator';

@Component({
    selector: 'lib-enable-account',
    styleUrls: ['./enable-account.component.scss'],
    templateUrl: './enable-account.component.html',
})
export class EnableAccountComponent {
    public hidePassword: boolean = true;
    public hideConfirmPassword: boolean = true;
    public activationForm: FormGroup;
    public activationCode = new FormControl('', [Validators.required]);
    public username = new FormControl('', [Validators.required]);
    public password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]);
    public confirmPassword = new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(16),
        passwordMatches(this.password),
    ]);

    public loading = false;

    public isEdge = isEdge();

    constructor(
        private formBuilder: FormBuilder,
        private svcAuth: AuthService,
        private router: Router,
        private svcNotification: NotificationService
    ) {
        this.activationForm = this.formBuilder.group({
            activationCode: this.activationCode,
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
        });
        this.confirmPassword.disable();
    }

    public enableConfirmPassword(event: KeyboardEvent) {
        this.password.valueChanges.subscribe((c) => {
            if (this.password.errors) {
                this.confirmPassword.disable();
            } else {
                this.confirmPassword.enable();
            }
        });
    }

    public doActivation(): void {
        // stop here if form is invalid
        if (this.activationForm.invalid) {
            return;
        }

        this.loading = true;

        this.svcAuth
            .enableAccount({
                activation_code: this.activationForm.value.activationCode,
                username: this.activationForm.value.username,
                password: this.activationForm.value.password,
                confirm_password: this.activationForm.value.confirmPassword,
            })
            .subscribe({
                next: () => {
                    this.router.navigate([AuthRoute.LOGIN]);
                    this.loading = false;
                },
                error: (e) => {
                    this.svcNotification.warning({ message: e.error }, 8);
                    this.loading = false;
                },
            });
    }

    public goLogin() {
        this.router.navigate([AuthRoute.LOGIN]);
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'activationCode':
                if (this.activationCode.hasError('required')) {
                    return 'ENABLE_ACCOUNT.CODE_ACTIVATE.VALIDATION';
                }
                return '';
            case 'username':
                if (this.username.hasError('required')) {
                    return 'ENABLE_ACCOUNT.USERNAME.VALIDATION';
                }
                return '';
            case 'password':
                if (this.password.hasError('required')) {
                    return 'ENABLE_ACCOUNT.PASSWORD.VALIDATION.REQUIRED';
                }
                if (this.password.hasError('minlength')) {
                    return 'ENABLE_ACCOUNT.PASSWORD.VALIDATION.MINLENGTH';
                }
                if (this.password.hasError('maxlength')) {
                    return 'ENABLE_ACCOUNT.PASSWORD.VALIDATION.MAXLENGTH';
                }
                return '';
            case 'confirmPassword':
                if (this.confirmPassword.hasError('required')) {
                    return 'ENABLE_ACCOUNT.CONFIRM_PASSWORD.VALIDATION.REQUIRED';
                }
                if (this.confirmPassword.hasError('minlength')) {
                    return 'ENABLE_ACCOUNT.CONFIRM_PASSWORD.VALIDATION.MINLENGTH';
                }
                if (this.confirmPassword.hasError('maxlength')) {
                    return 'ENABLE_ACCOUNT.CONFIRM_PASSWORD.VALIDATION.MAXLENGTH';
                }
                if (this.confirmPassword.hasError('noMatched')) {
                    return 'ENABLE_ACCOUNT.CONFIRM_PASSWORD.VALIDATION.NOMATCHED';
                }
                return '';
            default:
                return '';
        }
    }
}
