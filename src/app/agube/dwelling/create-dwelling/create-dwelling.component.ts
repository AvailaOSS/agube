import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DwellingService } from '@availa/agube-rest-api';
import { NotificationsService } from 'src/app/components/notifications/notifications.service';

@Component({
  selector: 'app-create-dwelling',
  templateUrl: './create-dwelling.component.html',
  styleUrls: ['./create-dwelling.component.scss'],
})
export class CreateDwellingComponent implements OnInit {
  public addNewWelling: FormGroup;
  public error = true;
  public username: string;
  public errorMessage: string;
  public options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };
  constructor(
    private router: Router,
    private readonly svcCreateNewDWelling: DwellingService,
    public alertService: NotificationsService
  ) {}

  public ngOnInit(): void {
    //
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
        (value) => {
          this.alertService.success('creado con éxito', this.options);
        },
        (error) => {
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
        (value) => {
          this.alertService.success('creado con éxito', this.options);
        },
        (error) => {
          this.alertService.error('error', this.options);
        }
      );
  }
}
