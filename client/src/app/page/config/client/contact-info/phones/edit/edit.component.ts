import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService, UserPhone } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { EditablePhone } from './editable-phone';

@Component({
    selector: 'app-phone-editable',
    styleUrls: ['./edit.component.scss'],
    templateUrl: './edit.component.html',
})
export class EditComponent {
    @Input() public userId: number | undefined;
    @Input() public phone: EditablePhone | undefined;

    @Output() public event: EventEmitter<UserPhone | undefined> = new EventEmitter<UserPhone | undefined>();
    @Output() public deleteEvent: EventEmitter<number | undefined> = new EventEmitter<number | undefined>();

    public newPhone = new FormControl('', [
        Validators.required,
        Validators.pattern('[- +()0-9]+'),
        Validators.minLength(9),
        Validators.maxLength(13),
    ]);

    constructor(
        private svcNotification: NotificationService,
        private svcUser: UserService,
        private svcTranslate: TranslateService
    ) {
        //TODO: COMPLETE THIS COMPONENT
    }

    public updatePhone() {
        if (!this.phone) {
            return;
        }

        this.phone.phone.phone = this.newPhone.value;

        this.svcUser.updateUserPhone(this.userId!, this.phone.phone.phone_id!, this.phone.phone).subscribe({
            next: (response) => {
                this.event.next(this.phone!.phone);
                this.phone!.isEditable = !this.phone!.isEditable;
                this.phone!.phone.main = true;
            },
            error: (error) => {
                let message: string = JSON.stringify(error.error);

                this.svcTranslate
                    .get('PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.ERROR')
                    .subscribe((response) => (message = response));
                this.svcNotification.warning({ message });
            },
        });
    }

    public setPhoneAsMain(value: boolean) {
        if (!this.phone) {
            return;
        }
        let phoneUser: UserPhone = {
            phone: this.phone.phone.phone,
            main: value,
        };
        this.svcUser.updateUserPhone(this.userId!, this.phone.phone.phone_id!, phoneUser).subscribe({
            next: (response: any) => {
                this.phone!.phone.main = response.main;
                this.event.next(this.phone!.phone);
            },
            error: (error) =>
                this.svcNotification.warning({
                    message: error,
                }),
        });
    }

    public openEditablePhoneForm() {
        if (!this.phone) {
            return;
        }
        this.newPhone.setValue(this.phone.phone.phone);
        this.phone.isEditable = !this.phone.isEditable;
    }

    public deletePhone() {
        if (!this.phone) {
            return;
        }

        this.svcUser.deleteUserPhone(this.userId!, this.phone.phone.phone_id!).subscribe({
            next: (response) => {
                this.deleteEvent.next(this.phone!.phone.phone_id);
            },
            error: (error) => {
                let message: string = JSON.stringify(error.error);

                this.svcTranslate
                    .get('PAGE.CONFIG.CLIENT.CONTACT-INFO.PHONE.FORM.ERROR')
                    .subscribe((response) => (message = response));
                this.svcNotification.warning({ message });
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
