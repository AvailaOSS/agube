import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { DwellingCreate } from '../../../../../../apiaux/agube-rest-api-lib/src/lib/model/dwellingCreate';

@Component({
  selector: 'app-add-welling',
  templateUrl: './add-welling.component.html',
  styleUrls: ['./add-welling.component.scss'],
})
export class AdDWellingComponent implements OnInit {
  hide = true;
  public addNewWelling: FormGroup;
  public loading = false;
  public submitted = false;
  public error: string;
  public formIdentification: number;
  public payType: string;
  requestSend: boolean;
  errorInformation: boolean;
  public pagador = false;
  public residente = false;
  public isHidden = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly svcCreateNewDWelling: DwellingService
  ) {}

  public ngOnInit(): void {}
  public sendForm(event: any): void {
    this.svcCreateNewDWelling
      .createDwelling({
        full_address: {
          address: {
<<<<<<< HEAD
            street: '1',
            isExternal: true,
=======
            town: event.town,
            street: event.address,
            is_external: true,
>>>>>>> dedf782... fix: update new apis
          },
          number: event.number,
          flat: event.flat,
          gate: event.gate,
        },
        paymaster: {
          username: event.username,
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
<<<<<<< HEAD
                street: '1',
                isExternal: true,
=======
                town: event.town,
                street: event.addressOwner,
                is_external: true,
>>>>>>> dedf782... fix: update new apis
              },
              number: event.number,
              flat: event.flat,
              gate: event.gate,
            },
          ],
        },
        resident: {
<<<<<<< HEAD
          username: 'test',
          firstName: event.first_nameRes,
          lastName: event.last_nameRes,
=======
          username: event.usernameRes,
          first_name: event.first_nameRes,
          last_name: event.last_nameRes,
>>>>>>> 92509f4... feat: add contador, vivienda, residente , pagador, propietario
          email: event.emailRes,
          phones: [{ phone_number: event.phonesRes }],
          address: [
            {
              address: {
<<<<<<< HEAD
                street: '1',
                isExternal: true,
=======
                town: event.town,
                street: event.addressRes,
                is_external: true,
>>>>>>> dedf782... fix: update new apis
              },
              number: event.number,
              flat: event.flat,
              gate: event.gate,
            },
          ],
        },
        water_meter: { code: event.code },
      })
      .subscribe((value) => {
<<<<<<< HEAD
<<<<<<< HEAD
        this.router.navigate[('/viviendas')]
=======
        this.router.navigate['/viviendas'];
>>>>>>> dedf782... fix: update new apis
=======
        this.router.navigate(['/viviendas']);
>>>>>>> f70d71a... Merge branch 'feature/redirection' into develop
      });
  }
}
