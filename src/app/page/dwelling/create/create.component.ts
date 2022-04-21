import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DwellingCreate, DwellingService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';

@Component({
  selector: 'app-page-dwelling-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends CreateAddress {
  public dwellingForm: FormGroup | undefined;
  public code = new FormControl('', [Validators.required]);

  public loadingPost = false;

  constructor(
    private router: Router,
    private svcNotification: NotificationService,
    private svcDwelling: DwellingService,
    protected override formBuilder: FormBuilder,
  ) {
    super(formBuilder);
  }

  public override addressFormReceive(addressEmitter: AddressEmitter) {
    super.addressFormReceive(addressEmitter);
    this.dwellingForm = this.formBuilder.group({
      address: addressEmitter.addressFormGroup,
      water_meter: this.formBuilder.group({
        code: this.code,
      }),
    });
  }

  public exit() {
    this.router.navigate(['manager/dwellings']);
  }

  public save() {
    this.loadingPost = true;

    this.onSave()!.subscribe({
      next: (response) => {
        this.resetForm();
        this.loadingPost = false;
      },
      error: (error) => {
        this.svcNotification.warning({ message: error });
        this.loadingPost = false;
      },
    });
  }

  public saveAndExit() {
    this.loadingPost = true;

    this.onSave()!.subscribe({
      next: (response) => {
        this.resetForm();
        this.loadingPost = false;
        this.exit();
      },
      error: (error) => {
        this.svcNotification.warning({ message: error });
        this.loadingPost = false;
      },
    });
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'code':
        if (this.code.hasError('required')) {
          return 'NEW_DWELLING.FORM.CODE_COUNTER.VALIDATION';
        }
        return '';
      default:
        return '';
    }
  }

  private resetForm() {
    this.resetChildForm = !this.resetChildForm;
    this.code.setValue('');
  }

  private onSave() {
     let dwelling: DwellingCreate = {
      address: this.getAddress(),
      water_meter: {
        code: this.code.value,
      },
    };

    return this.svcDwelling.createDwelling(dwelling);
  }
}
