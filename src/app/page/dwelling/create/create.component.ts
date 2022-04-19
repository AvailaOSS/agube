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

@Component({
  selector: 'app-page-dwelling-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public dwellingForm: FormGroup | undefined;
  public waterMeter: FormGroup;
  public code = new FormControl('', [Validators.required]);
  public gate = new FormControl('', []);
  public flat = new FormControl('', []);
  public number = new FormControl('', [Validators.required]);
  public street = new FormControl('', [Validators.required]);
  public town = new FormControl('', [Validators.required]);

  public loadingPost = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService,
    private svcDwelling: DwellingService
  ) {
    this.waterMeter = this.formBuilder.group({
      code: this.code,
    });
  }

  public addressFormReceive(addressGroup: FormGroup) {
    this.dwellingForm = this.formBuilder.group({
      address: addressGroup,
      water_meter: this.formBuilder.group({
        code: this.code,
      }),
    });
  }

  public save() {
    if (!this.dwellingForm || this.dwellingForm.invalid) {
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
    this.router.navigate(['manager/dwellings']);
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
          return 'NEW_DWELLING.FORM.CODE_COUNTER.VALIDATION';
        }
        return '';
      case 'town':
        if (this.town.hasError('required')) {
          return 'NEW_DWELLING.FORM.TOWN.VALIDATION';
        }
        return '';
      case 'street':
        if (this.street.hasError('required')) {
          return 'NEW_DWELLING.FORM.STREET.VALIDATION';
        }
        return '';
      case 'number':
        if (this.number.hasError('required')) {
          return 'NEW_DWELLING.FORM.NUMBER.VALIDATION';
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
  }

  private onSave() {
    let dwelling: DwellingCreate = {
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
    };

    return this.svcDwelling.createDwelling(dwelling);
  }
}
