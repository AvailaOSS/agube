import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReservoirService, ReservoirCreate } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { AccountService } from '@availa/auth-fe';

@Component({
  selector: 'app-page-reservoir-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public reservoirForm: FormGroup;
  public code = new FormControl('', [Validators.required]);
  public number = new FormControl('', []);
  public street = new FormControl('', [Validators.required]);
  public town = new FormControl('', [Validators.required]);
  public capacity = new FormControl('', [Validators.required]);
  public inletFlow = new FormControl('', [Validators.required]);
  public outletFlow = new FormControl('', [Validators.required]);

  @Input() public userId: number = -1;

  public loadingPost = false;

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
    this.reservoirForm = this.formBuilder.group({
      full_address: formBuilder.group({
        address: formBuilder.group({
          town: this.town,
          street: this.street,
        }),
        number: this.number,
      }),
      water_meter: this.formBuilder.group({
        code: this.code,
      }),
      capacity: this.capacity,
      inletFlow: this.inletFlow,
      outletFlow: this.outletFlow,
    });
  }

  public save() {
    if (this.reservoirForm.invalid) {
      return;
    }

    this.loadingPost = true;

    this.onSave().subscribe({
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

    this.onSave().subscribe({
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
      case 'street':
        if (this.street.hasError('required')) {
          return 'RESERVOIR.CREATE.FORM.STREET.VALIDATION';
        }
        return '';
      case 'town':
        if (this.town.hasError('required')) {
          return 'RESERVOIR.CREATE.FORM.TOWN.VALIDATION';
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
    this.number.setValue('');
    this.town.setValue('');
    this.street.setValue('');
    this.code.setValue('');
    this.capacity.setValue('');
    this.outletFlow.setValue('');
    this.inletFlow.setValue('');
  }

  private onSave() {
    let reservoir: ReservoirCreate = {
      address: {
        city: '',
        city_district: '',
        country: '',
        geolocation: {
          latitude: '',
          longitude: '',
          zoom: 0,
          horizontal_degree: 0,
          vertical_degree: 0,
        },
        municipality: '',
        postcode: '',
        province: '',
        state: '',
        flat: '',
        gate: '',
        number: 0,
        road: '',
        village: '',
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
}
