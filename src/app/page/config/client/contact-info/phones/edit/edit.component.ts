import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService, UserPhone } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { EditablePhone } from './editable-phone';

@Component({
  selector: 'app-phone-editable',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  private infoMessage: string = 'Esta funcionalidad aún no está disponible';

  @Input() public userId: number | undefined;
  @Input() public phone: EditablePhone | undefined;

  @Output() public event: EventEmitter<
    UserPhone | undefined
  > = new EventEmitter<UserPhone | undefined>();
  @Output() public deleteEvent: EventEmitter<
    number | undefined
  > = new EventEmitter<number | undefined>();

  public newPhone = new FormControl('', [
    Validators.required,
    Validators.pattern('[- +()0-9]+'),
    Validators.minLength(9),
    Validators.maxLength(13),
  ]);

  constructor(
    private svcNotification: NotificationService,
    private svcUser: UserService
  ) {
    //TODO: COMPLETE THIS COMPONENT
  }

  public updatePhone() {
    if (!this.phone) {
      return;
    }

    this.phone.phone.phone = this.newPhone.value;

    this.svcUser
      .updateUserPhone(
        this.userId!,
        this.phone.phone.phone_id!,
        this.phone.phone
      )
      .subscribe({
        next: (response) => {
          this.event.next(this.phone!.phone);
          this.phone!.isEditable = !this.phone!.isEditable;
        },
        error: (error) =>
          this.svcNotification.warning({
            message: error,
          }),
      });
  }

  public setPhoneAsMain() {
    if (!this.phone) {
      return;
    }
    this.svcNotification.info({
      message: this.infoMessage,
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

    this.svcUser
      .deleteUserPhone(this.userId!, this.phone.phone.phone_id!)
      .subscribe({
        next: (response) => {
          this.deleteEvent.next(this.phone!.phone.phone_id);
        },
        error: (error) =>
          this.svcNotification.warning({
            message: error,
          }),
      });
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'newPhone':
        let invalidPattern =
          'CONTACT_INFO.PHONES.EDIT_FORM.VALIDATIONS.PATTERN';

        if (this.newPhone.hasError('required')) {
          return 'CONTACT_INFO.PHONES.EDIT_FORM.VALIDATIONS.REQUIRED';
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
