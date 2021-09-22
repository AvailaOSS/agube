import { Component, Input } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, DwellingService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { AgubeRoute } from '../../../../../agube-route';

@Component({
  selector: 'app-change-resident',
  templateUrl: './change-resident.component.html',
  styleUrls: ['./change-resident.component.scss'],
})
export class ChangeResidentComponent {
  title = 'Alta Residente';
  dwellingId: number;
  residentForm: FormGroup;
  userForm: FormArray;
  public addressComplement: any;

  constructor(
    private formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    public readonly svcAlert: NotificationService,
    private readonly svcCreateNewDWelling: DwellingService
  ) {
    this.createForm();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.dwellingId = params.data;
    });
  }

  private createForm(): void {
    this.residentForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      address: this.formBuilder.array([this.addAddress()]),
      phones: this.formBuilder.array([this.addPhone()]),
    });
  }

  public addPhone(): FormGroup {
    return this.formBuilder.group({
      phone_number: ['', Validators.required],
    });
  }
  public addPhoneButton(): void {
    this.userForm = this.residentForm.get('phones') as FormArray;
    this.userForm.push(this.addPhone());
  }
  public removePhone(index: number): void {
    this.userForm = this.residentForm.get('phones') as FormArray;
    this.userForm.removeAt(index);
  }

  public addAddress(): FormGroup {
    return this.formBuilder.group({
      number: ['', Validators.required],
      flat: ['', Validators.required],
      gate: ['', Validators.required],
      town: ['', Validators.required],
      street: ['', Validators.required],
      is_external: [false, Validators.required],
    });
  }

  public addAddressButton(): void {
    this.userForm = this.residentForm.get('address') as FormArray;
    this.userForm.push(this.addAddress());
  }
  public removeAddress(index: number): void {
    this.userForm = this.residentForm.get('address') as FormArray;
    this.userForm.removeAt(index);
  }

  public onSubmit(): void {
    this.residentForm.value.address.forEach((value) => {
      this.addressComplement = {
        flat: value.flat,
        gate: value.gate,
        address: {
          town: value.town,
          street: value.street,
          is_external: value.is_external,
        },
      };
    });

    this.residentForm.value.address = this.addressComplement;
    this.svcCreateNewDWelling
      .changeCurrentResident(this.dwellingId, {
        user: this.residentForm.value,
      })
      .subscribe(
        () => {
          this.router.navigate([AgubeRoute.DWELLING]);
        },
        (err) => {
          this.svcAlert.error(JSON.stringify(err.error), {
            autoClose: false,
            keepAfterRouteChange: false,
          });
        }
      );
  }
}
