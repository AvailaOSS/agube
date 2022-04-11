import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserAddress, UserService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { EditableAddress } from './editable-address';

@Component({
  selector: 'app-address-editable',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  private infoMessage: string = 'Esta funcionalidad aún no está disponible';

  @Input() public userId: number | undefined;
  @Input() public address: EditableAddress | undefined;

  @Output() public updatedEvent: EventEmitter<UserAddress | undefined> =
    new EventEmitter<UserAddress | undefined>();
  @Output() public deleteEvent: EventEmitter<number | undefined> =
    new EventEmitter<number | undefined>();

  public fullAddressForm: FormGroup;
  public town = new FormControl('', [Validators.required]);
  public street = new FormControl('', [Validators.required]);
  public number = new FormControl('', [Validators.required]);
  public flat = new FormControl('', []);
  public gate = new FormControl('', [Validators.required]);

  constructor(
    private svcNotification: NotificationService,
    private svcUser: UserService,

    private formBuilder: FormBuilder
  ) {
    this.fullAddressForm = formBuilder.group({
      address: formBuilder.group({
        town: this.town,
        street: this.street,
      }),
      number: this.number,
      flat: this.flat,
      gate: this.gate,
    });
  }

  public updateAddress() {
    if (!this.address) {
      return;
    }

    console.log(this.address);

    let userAddress: UserAddress = {
      main: this.address.address.main,
      id: this.address.address.id,
      full_address: {
        address: {
          street: this.street.value,
          town: this.town.value,
          is_external: this.address.address.full_address.address.is_external,
        },
        number: this.number.value,
        flat: this.flat.value,
        gate: this.gate.value,
      },
    };

    this.svcUser
      .updateUserAddress(
        this.address.address.full_address.id!,
        this.userId!,
        userAddress
      )
      .subscribe({
        next: (response) => {
          this.updatedEvent.next(userAddress);
          this.address!.isEditable = !this.address!.isEditable;
        },
        error: (error) =>
          this.svcNotification.warning({
            message: error,
          }),
      });
  }

  public setAddressAsMain() {
    if (!this.address) {
      return;
    }
    this.svcNotification.info({
      message: this.infoMessage,
    });
  }

  public openEditableAddressForm() {
    if (!this.address) {
      return;
    }
    this.town.setValue(this.address.address.full_address.address.town);
    this.street.setValue(this.address.address.full_address.address.street);
    this.number.setValue(this.address.address.full_address.number);
    this.flat.setValue(this.address.address.full_address.flat);
    this.gate.setValue(this.address.address.full_address.gate);
    this.address.isEditable = !this.address.isEditable;
  }

  public deleteAddress() {
    if (!this.address) {
      return;
    }

    this.svcUser
      .deleteUserAddress(this.address.address.full_address.id!, this.userId!)
      .subscribe({
        next: (response) => {
          this.deleteEvent.next(this.address!.address.id);
        },
        error: (error) =>
          this.svcNotification.warning({
            message: error,
          }),
      });
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'gate':
        if (this.gate.hasError('required')) {
          return 'CONTACT_INFO.ADDRESS.FORM.VALIDATIONS.GATE';
        }
        return '';
      case 'number':
        if (this.number.hasError('required')) {
          return 'CONTACT_INFO.ADDRESS.FORM.VALIDATIONS.NUMBER';
        }
        return '';
      case 'street':
        if (this.street.hasError('required')) {
          return 'CONTACT_INFO.ADDRESS.FORM.VALIDATIONS.STREET';
        }
        return '';
      case 'town':
        if (this.town.hasError('required')) {
          return 'CONTACT_INFO.ADDRESS.FORM.VALIDATIONS.TOWN';
        }
        return '';
      default:
        return '';
    }
  }
}
