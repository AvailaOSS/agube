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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public reservoirForm: FormGroup;
  public code = new FormControl('', [Validators.required]);
  public gate = new FormControl('', []);
  public flat = new FormControl('', []);
  public number = new FormControl('', [Validators.required]);
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
        flat: this.flat,
        gate: this.gate,
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
          return 'Revisa cuál es el código del contador de agua del Depósito';
        }
        return '';
      case 'number':
        if (this.number.hasError('required')) {
          return 'Escribe el número de la dirección';
        }
        return '';
      case 'street':
        if (this.street.hasError('required')) {
          return 'Escribe la calle a la que corresponde el Depósito';
        }
        return '';
      case 'town':
        if (this.town.hasError('required')) {
          return 'Escribe la ciudad en la que se encuentra el Depósito';
        }
        return '';
      case 'capacity':
        if (this.capacity.hasError('required')) {
          return 'Escribe la capacidad total del Depósito';
        }
        return '';
      case 'inletFlow':
        if (this.inletFlow.hasError('required')) {
          return 'Escribe el flujo de entrada del Depósito';
        }
        return '';
      case 'outletFlow':
        if (this.outletFlow.hasError('required')) {
          return 'Escribe el flujo de salida del Depósito';
        }
        return '';
      default:
        return '';
    }
  }

  private resetForm() {
    this.gate.setValue('');
    this.flat.setValue('');
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
      full_address: {
        gate: this.gate.value,
        flat: this.flat.value,
        number: this.number.value,
        address: {
          is_external: false,
          town: this.town.value,
          street: this.street.value,
        },
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
