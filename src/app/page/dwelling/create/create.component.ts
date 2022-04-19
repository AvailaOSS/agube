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
import { AddressEmitter } from '../../../components/street-view/create/address-emitter';
import { LocationResponse } from 'src/app/components/street-view/create/location-response';

@Component({
  selector: 'app-page-dwelling-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public dwellingForm: FormGroup | undefined;
  public code = new FormControl('', [Validators.required]);

  public loadingPost = false;

  private location: LocationResponse | undefined;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService,
    private svcDwelling: DwellingService
  ) {}

  public addressFormReceive(addressEmitter:AddressEmitter ) {
    this.dwellingForm = this.formBuilder.group({
      address: addressEmitter.addressFormGroup,
      water_meter: this.formBuilder.group({
        code: this.code,
      }),
    });
    this.location = addressEmitter.location;
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

  public exit() {
    this.router.navigate(['manager/dwellings']);
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
    this.code.setValue('');
  }

  private onSave() {
    if (!this.dwellingForm || this.dwellingForm.invalid) {
      return;
    }
    console.log(this.dwellingForm.value);
    console.log(this.location);
    
    // let dwelling: DwellingCreate = {
    //   full_address: {
    //     gate: ,
    //     flat: ,
    //     number: ,
    //     address: {
    //       is_external: false,
    //       town: ,
    //       street: ,
    //     },
    //   },
    //   water_meter: {
    //     code: this.code.value,
    //   },
    // };

    return this.svcDwelling.createDwelling(this.dwellingForm.value);
  }
}
