import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-add-welling',
  templateUrl: './add-welling.component.html',
  styleUrls: ['./add-welling.component.scss'],
})
export class AdDWellingComponent implements OnInit {
  public addNewWelling: FormGroup;
  public error: boolean = true;
  public username: string;
  constructor(
    private router: Router,
    private readonly svcCreateNewDWelling: DwellingService
  ) {}

  public ngOnInit(): void {}
  public sendForm(event: any): void {
    if (event.pagador === true) {
      this.username = event.username;
    } else {
      this.username = event.usernameRes;
    }
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
          this.router.navigate(['/viviendas']);
        },
        (error) => {
          this.error = false;
        }
      );
  }
}
