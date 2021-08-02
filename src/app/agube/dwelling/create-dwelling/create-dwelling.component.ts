import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DwellingService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { AgubeRoute } from '../../agube-route';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dwelling',
  templateUrl: './create-dwelling.component.html',
  styleUrls: ['./create-dwelling.component.scss'],
})
export class CreateDwellingComponent implements OnInit {
  public createFormGroup: FormGroup;
  public ownerFormGroup: FormGroup;
  public residentFormGroup: FormGroup;
  public paymasterFormGroup: FormGroup;
  public radioGroupForm: FormGroup;

  public submitted = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  constructor(
    private readonly svcCreateNewDWelling: DwellingService,
    public alertService: NotificationService,
    private readonly svcRouter: Router,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.createFormGroup = this.formBuilder.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      gate: ['', Validators.required],
      flat: ['', Validators.required],
      city: ['', Validators.required],
      waterMeter: ['', Validators.required],
    });
    this.ownerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.residentFormGroup = this.formBuilder.group({
      nameRes: ['', Validators.required],
      lastNameRes: ['', Validators.required],
      usernameRes: ['', Validators.required],
      emailRes: ['', Validators.required],
      phoneRes: ['', Validators.required],
    });
    this.paymasterFormGroup = this.formBuilder.group({
      iban: ['', Validators.required],
    });
    this.radioGroupForm = this.formBuilder.group({
      model: 1,
    });
  }

  get f() {
    return this.createFormGroup.controls;
  }

  // FIXME : CAMBIAR IBAN EN EL FUTURO --- POSIBLE CAMBIO DE API
  public onSubmitOwner(): void {
    this.svcCreateNewDWelling
      .createDwelling({
        full_address: {
          address: {
            town: this.createFormGroup.value.city,
            street: this.createFormGroup.value.street,
            is_external: true,
          },
          number: this.createFormGroup.value.number,
          flat: this.createFormGroup.value.flat,
          gate: this.createFormGroup.value.gate,
        },
        paymaster: {
          username: this.ownerFormGroup.value.username,
          iban: '123456789',
          payment_type: 'BANK',
        },
        owner: {
          username: this.ownerFormGroup.value.username,
          first_name: this.ownerFormGroup.value.name,
          last_name: this.ownerFormGroup.value.lastName,
          email: this.ownerFormGroup.value.email,
          phones: [{ phone_number: this.ownerFormGroup.value.phone }],
          address: [
            {
              address: {
                town: this.createFormGroup.value.city,
                street: this.createFormGroup.value.street,
                is_external: true,
              },
              number: this.createFormGroup.value.number,
              flat: this.createFormGroup.value.flat,
              gate: this.createFormGroup.value.gate,
            },
          ],
        },
        water_meter: { code: this.createFormGroup.value.waterMeter },
      })
      .subscribe(
        () => {
          this.svcRouter.navigate([AgubeRoute.DWELLING]);
        },
        (err) => {
          this.alertService.error(
            JSON.stringify(err.error),
            this.options
          );
        }
      );
  }

  public onSubmitResident(): void {
    let usernamePaymaster: string;
    if (this.radioGroupForm.value.model === 'Residente') {
      usernamePaymaster = this.residentFormGroup.value.username;
    } else {
      usernamePaymaster = this.ownerFormGroup.value.username;
    }
    this.svcCreateNewDWelling
      .createDwellingWithResident({
        full_address: {
          address: {
            town: this.createFormGroup.value.city,
            street: this.createFormGroup.value.street,
            is_external: true,
          },
          number: this.createFormGroup.value.number,
          flat: this.createFormGroup.value.flat,
          gate: this.createFormGroup.value.gate,
        },
        paymaster: {
          username: usernamePaymaster,
          iban: this.paymasterFormGroup.value.iban,
          payment_type: 'BANK',
        },
        owner: {
          username: this.ownerFormGroup.value.username,
          first_name: this.ownerFormGroup.value.name,
          last_name: this.ownerFormGroup.value.lastName,
          email: this.ownerFormGroup.value.email,
          phones: [{ phone_number: this.ownerFormGroup.value.phone }],
          address: [
            {
              address: {
                town: this.createFormGroup.value.city,
                street: this.ownerFormGroup.value.address,
                is_external: true,
              },
              number: this.createFormGroup.value.number,
              flat: this.createFormGroup.value.flat,
              gate: this.createFormGroup.value.gate,
            },
          ],
        },

        resident: {
          username: this.residentFormGroup.value.usernameRes,
          first_name: this.residentFormGroup.value.nameRes,
          last_name: this.residentFormGroup.value.lastNameRes,
          email: this.residentFormGroup.value.emailRes,
          phones: [{ phone_number: this.residentFormGroup.value.phoneRes }],
          address: [
            {
              address: {
                town: this.createFormGroup.value.city,
                street: this.createFormGroup.value.street,
                is_external: true,
              },
              number: this.createFormGroup.value.number,
              flat: this.createFormGroup.value.flat,
              gate: this.createFormGroup.value.gate,
            },
          ],
        },
        water_meter: { code: this.createFormGroup.value.waterMeter },
      })
      .subscribe(
        () => {
          this.svcRouter.navigate([AgubeRoute.DWELLING]);
        },
        (err) => {
          this.alertService.error(
            JSON.stringify(err.error),
            this.options
          );
        }
      );
  }
}
