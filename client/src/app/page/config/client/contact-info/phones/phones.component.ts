import { NotificationService } from 'src/app/components/notification/notification.service';
import { Component } from '@angular/core';
import { UserPhone, UserService } from '@availaoss/agube-rest-api';
import { EditablePhone } from './edit/editable-phone';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/page/auth/login/service/account.service';

@Component({
    selector: 'app-phones',
    styleUrls: ['./phones.component.scss'],
    templateUrl: './phones.component.html',
})
export class PhonesComponent {
    public userId: number = -1;
    public phones: EditablePhone[] = [];
    public canAddPhone: boolean = false;
    public newPhone = new FormControl('', [
        Validators.required,
        Validators.pattern('[- +()0-9]+'),
        Validators.minLength(9),
        Validators.maxLength(13),
    ]);

    constructor(
        private svcAccount: AccountService,
        private svcUser: UserService,
        private svcNotification: NotificationService
    ) {
        this.svcAccount.getUser().subscribe((response) => {
            if (!response) {
                return;
            }

            this.userId = response!.user_id;

            this.getPhones(this.userId);
        });
    }

    public openClosePhoneForm() {
        this.canAddPhone = !this.canAddPhone;
    }

    public savePhone() {
        if (this.newPhone.hasError('required')) {
            return;
        }

        let newPhone = { main: false, phone: this.newPhone.value };

        this.svcUser.addUserPhone(this.userId, newPhone).subscribe({
            next: (response) => {
                this.phones.push({ phone: response, isEditable: false });
                this.canAddPhone = !this.canAddPhone;
                this.newPhone.setValue('');
            },
            error: (error) => this.svcNotification.warning({ message: error }),
        });
    }

    public refreshPhones(phone: UserPhone | undefined) {
        if (!phone) {
            return;
        }

        this.phones.forEach((phoneUser) => {
            if (phoneUser.phone.phone_id !== phone.phone_id) {
                phoneUser.phone.main = false;
            }
        });

        const index = this.phones
            .map((p) => {
                return p.phone.phone_id;
            })
            .indexOf(phone.phone_id, 0);

        if (index > -1) {
            this.phones.splice(index, 0);
        }
    }

    public phoneDeleted(phoneId: number | undefined): void {
        if (!phoneId) {
            return;
        }

        const index = this.phones
            .map((p) => {
                return p.phone.phone_id;
            })
            .indexOf(phoneId, 0);

        if (index > -1) {
            this.phones.splice(index, 1);
        }
    }

    private getPhones(userId: number) {
        this.svcUser.getUserPhone(userId).subscribe({
            next: (phones) => {
                this.phones = phones.map((phone) => {
                    return { phone: phone, isEditable: false };
                });
            },
            error: (error) => {
                if (error.status === 401) {
                    this.svcAccount.logout();
                }
            },
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'newPhone':
                let invalidPattern = 'PAGE.CONFIG.CLIENT.CONTACT-INFO.PHONE.FORM.VALIDATION.PATTERN';
                if (this.newPhone.hasError('required')) {
                    return 'PAGE.CONFIG.CLIENT.CONTACT-INFO.PHONE.FORM.VALIDATION.REQUIRED';
                }
                if (this.newPhone.hasError('pattern')) {
                    return invalidPattern;
                }
                if (this.newPhone.hasError('minlength')) {
                    return invalidPattern;
                }
                if (this.newPhone.hasError('maxlength')) {
                    return invalidPattern;
                }
                return '';
            default:
                return '';
        }
    }
}
