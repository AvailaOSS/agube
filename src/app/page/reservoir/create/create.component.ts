import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReservoirService, ReservoirCreate } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { AccountService } from '@availa/auth-fe';
import { AddressEmitter } from 'src/app/components/map/create/address-emitter';
import { LocationResponse } from 'src/app/components/map/map/location-response';
import { InputForm } from '../../../components/map/create/input-form';
import { ConfigureMap } from '../../../components/map/map/configure-map';

@Component({
  selector: 'app-page-reservoir-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public reservoirForm: FormGroup | undefined;
  public code = new FormControl('', [Validators.required]);
  public capacity = new FormControl('', [Validators.required]);
  public inletFlow = new FormControl('', [Validators.required]);
  public outletFlow = new FormControl('', [Validators.required]);

  public inputForm: InputForm = {
    street: new FormControl('', Validators.required),
    number: new FormControl(''),
  };

  @Input() public userId: number = -1;

  public resetChildForm: boolean = false;
  public loadingPost = false;

  public configureMap: ConfigureMap = {
    lat: 39.92666,
    lon: -2.33976,
    zoom: 6,
    showCircle: false,
    height: '400px',
  };

  private location: LocationResponse | undefined;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService,
    private svcReservoir: ReservoirService,
    private svcAccount: AccountService
  ) {
    this.svcAccount.getUser().subscribe((response) => {
      this.userId = response!.user_id;
    });
  }

  public addressFormReceive(addressEmitter: AddressEmitter) {
    this.reservoirForm = this.formBuilder.group({
      address: addressEmitter.addressFormGroup,
      water_meter: this.formBuilder.group({
        code: this.code,
      }),
      capacity: this.capacity,
      inletFlow: this.inletFlow,
      outletFlow: this.outletFlow,
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
    this.router.navigate(['manager/reservoirs']);
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
          return 'RESERVOIR.CREATE.FORM.WATER_METER_CODE.VALIDATION';
        }
        return '';
      case 'capacity':
        if (this.capacity.hasError('required')) {
          return 'RESERVOIR.CREATE.FORM.CAPACITY.VALIDATION';
        }
        return '';
      case 'inletFlow':
        if (this.inletFlow.hasError('required')) {
          return 'RESERVOIR.CREATE.FORM.INLET_FLOW.VALIDATION';
        }
        return '';
      case 'outletFlow':
        if (this.outletFlow.hasError('required')) {
          return 'RESERVOIR.CREATE.FORM.OUTLET_FLOW.VALIDATION';
        }
        return '';
      default:
        return '';
    }
  }

  private resetForm() {
    this.code.setValue('');
    this.capacity.setValue('');
    this.outletFlow.setValue('');
    this.inletFlow.setValue('');
  }

  private onSave() {
    if (
      !this.reservoirForm ||
      this.reservoirForm.invalid ||
      !this.location ||
      !this.location.address
    ) {
      return;
    }
    // console.log(this.dwellingForm.value);
    let address = this.location.address;

    let reservoir: ReservoirCreate = {
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
        flat: this.getOptionalValue(this.reservoirForm.get('address')!, 'flat'),
        gate: this.getOptionalValue(this.reservoirForm.get('address')!, 'gate'),
        number: this.reservoirForm.get('address')!.get('number')!.value,
        road: this.reservoirForm.get('address')!.get('street')!.value,
        village: address.village,
        is_external: false,
      },
      water_meter: {
        code: this.code.value,
      },
      user_id: this.userId,
      capacity: this.capacity.value,
      inlet_flow: this.inletFlow.value,
      outlet_flow: this.outletFlow.value,
    };

    return this.svcReservoir.createReservoir(reservoir);
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
