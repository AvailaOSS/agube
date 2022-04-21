import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { DwellingCreate, DwellingService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { AddressEmitter } from '../../../components/map/create/address-emitter';
import { LocationResponse } from 'src/app/components/map/map/location-response';
import { InputForm } from 'src/app/components/map/create/input-form';

@Component({
  selector: 'app-page-dwelling-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public dwellingForm: FormGroup | undefined;
  public code = new FormControl('', [Validators.required]);

  public loadingPost = false;

  public inputForm: InputForm = {
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    flat: new FormControl(''),
    gate: new FormControl(''),
  };

  public resetChildForm: boolean = false;

  private location: LocationResponse | undefined;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService,
    private svcDwelling: DwellingService
  ) {}

  public addressFormReceive(addressEmitter: AddressEmitter) {
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
    this.resetChildForm = !this.resetChildForm;
    this.code.setValue('');
  }

  private onSave() {
    if (
      !this.dwellingForm ||
      this.dwellingForm.invalid ||
      !this.location ||
      !this.location.address
    ) {
      return;
    }

    // console.log(this.dwellingForm.value);
    let address = this.location.address;

    let dwelling: DwellingCreate = {
      address: {
        city: address.city,
        city_district: address.city_district,
        country: address.country,
        geolocation: {
          latitude: String(this.location.lat),
          longitude: String(this.location.lon),
          zoom: this.location.zoom,
          horizontal_degree: 0,
          vertical_degree: 0,
        },
        municipality: address.municipality,
        postcode: address.postcode,
        province: address.province,
        state: address.state,
        flat: this.getOptionalValue(this.dwellingForm.get('address')!, 'flat'),
        gate: this.getOptionalValue(this.dwellingForm.get('address')!, 'gate'),
        number: this.dwellingForm.get('address')!.get('number')!.value,
        road: this.dwellingForm.get('address')!.get('street')!.value,
        village: address.village,
        is_external: false,
      },
      water_meter: {
        code: this.code.value,
      },
    };

    return this.svcDwelling.createDwelling(dwelling);
  }

  private getOptionalValue(formGroup: AbstractControl, extract: string) {
    let value = undefined;
    let form = formGroup.get(extract);
    if (form) {
      value = form.value;
    }
    return value;
  }
}
