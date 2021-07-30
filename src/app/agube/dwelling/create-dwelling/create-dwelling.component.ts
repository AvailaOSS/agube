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
  public submitted = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };
  public ownerId: string;
  public userId: string;
  public name: string;
  public lastName: string;
  public email: string;
  public username: string;
  public phone: string;

  public residentId: string;
  public userIdRes: string;
  public residentData: any;

  public nameRes: string;
  public lastNameRes: string;
  public emailRes: string;
  public usernameRes: string;
  public phoneRes: string;

  public paymaster: any;
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
    });
    this.residentFormGroup = this.formBuilder.group({
      nameRes: ['', Validators.required],
      lastNameRes: ['', Validators.required],
      usernameRes: ['', Validators.required],
      emailRes: ['', Validators.required],
      phoneRes: ['', Validators.required],
    });
    this.ownerFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  get f() {
    return this.createFormGroup.controls;
  }

  public paymasterClick(event: any): void {
    console.log(event);
  }

  public paymasterClickRes(event: any): void {
    console.log(event);
  }
  public onSubmitOwner(): void {
    console.log('direccion', this.createFormGroup.value);
    console.log('propietario', this.ownerFormGroup.value);
  }
  public onSubmitResident(): void {
    console.log('Residente', this.residentFormGroup.value);
  }
  public sendForm(event: any): void {
    if (event.resident === false || event.resident === null) {
      this.createDwelling(event);
    } else {
      this.createDwellingWithResident(event);
    }
  }

  private createDwelling(event: any): void {
    if (event.pagador === true) {
      this.username = event.username;
    } else {
      this.username = event.usernameRes;
    }

    this.svcCreateNewDWelling
      .createDwellingWithResident({
        full_address: {
          address: {
            town: event.town,
            street: event.address,
            is_external: true,
          },
          number: event.number,
          flat: event.flat,
          gate: event.gate,
        },
        paymaster: {
          username: this.username,
          iban: event.numberBank,
          payment_type: 'BANK',
        },
        owner: {
          username: event.username,
          first_name: event.first_name,
          last_name: event.last_name,
          email: event.email,
          phones: [{ phone_number: event.phones }],
          address: [
            {
              address: {
                town: event.town,
                street: event.addressOwner,
                is_external: true,
              },
              number: event.number,
              flat: event.flat,
              gate: event.gate,
            },
          ],
        },

        resident: {
          username: event.usernameRes,
          first_name: event.first_nameRes,
          last_name: event.last_nameRes,
          email: event.emailRes,
          phones: [{ phone_number: event.phonesRes }],
          address: [
            {
              address: {
                town: event.town,
                street: event.addressRes,
                is_external: true,
              },
              number: event.number,
              flat: event.flat,
              gate: event.gate,
            },
          ],
        },
        water_meter: { code: event.code },
      })
      .subscribe(
        () => {
          this.alertService.success('creado con éxito', this.options);
          setTimeout(() => {
            this.svcRouter.navigate([AgubeRoute.DWELLING]);
          }, 1500);
        },
        () => {
          this.alertService.error('error', this.options);
        }
      );
  }

  private createDwellingWithResident(event: any): void {
    this.username = event.username;
    this.svcCreateNewDWelling
      .createDwelling({
        full_address: {
          address: {
            town: event.town,
            street: event.address,
            is_external: true,
          },
          number: event.number,
          flat: event.flat,
          gate: event.gate,
        },
        paymaster: {
          username: this.username,
          iban: event.numberBank,
          payment_type: 'BANK',
        },
        owner: {
          username: event.username,
          first_name: event.first_name,
          last_name: event.last_name,
          email: event.email,
          phones: [{ phone_number: event.phones }],
          address: [
            {
              address: {
                town: event.town,
                street: event.addressOwner,
                is_external: true,
              },
              number: event.number,
              flat: event.flat,
              gate: event.gate,
            },
          ],
        },
        water_meter: { code: event.code },
      })
      .subscribe(
        () => {
          this.alertService.success('creado con éxito', this.options);
          setTimeout(() => {
            this.svcRouter.navigate([AgubeRoute.DWELLING]);
          }, 1500);
        },
        () => {
          this.alertService.error('error', this.options);
        }
      );
  }
}
