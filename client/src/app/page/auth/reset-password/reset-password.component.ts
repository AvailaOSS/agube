import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ResetPassword } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { AuthRoute } from '../auth-route';

@Component({
    selector: 'lib-reset-password',
    styleUrls: ['./reset-password.component.scss'],
    templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
    public email = new FormControl('', [Validators.required]);

    public loading = false;

    constructor(private svcAuth: AuthService, private svcNotification: NotificationService, private router: Router) {}

    public goLogin() {
        this.router.navigate([AuthRoute.LOGIN]);
    }

    public doResetPassword() {
        // stop here if form is invalid
        if (this.email.invalid) {
            return;
        }

        this.loading = true;

        let resetPassword: ResetPassword = {
            email: this.email.value,
        };

        this.svcAuth.resetPassword(resetPassword).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate([AuthRoute.LOGIN]);
            },
            error: (e) => {
                this.loading = false;
                this.svcNotification.warning({ message: e.error });
            },
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'email':
                if (this.email.hasError('required')) {
                    return 'RESET_PASSWORD.FORM.EMAIL.VALIDATION';
                }
                return '';
            default:
                return '';
        }
    }
}
