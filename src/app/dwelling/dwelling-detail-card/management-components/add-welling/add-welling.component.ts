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
    console.log('add-welling', event);
    this.svcCreateNewDWelling
      .dwellingCreateCreate({
        full_address: {
          address: {
            street: '1',
            isExternal: true,
          },
          number: event.number,
          town: event.town,
          flat: event.flat,
          gate: event.gate,
        },
        owner: {
          username: event.username,
          firstName: event.first_name,
          lastName: event.last_name,
          email: event.email,
          phones: [{ phone_number: event.phones }],
          address: [
            {
              address: {
                street: '1',
                isExternal: true,
              },
              number: event.number,
              town: event.town,
              flat: event.flat,
              gate: event.gate,
            },
          ],
        },
        resident: {
          username: 'test',
          firstName: event.first_nameRes,
          lastName: event.last_nameRes,
          email: event.emailRes,
          phones: [{ phone_number: event.phonesRes }],
          address: [
            {
              address: {
                street: '1',
                isExternal: true,
              },
              number: event.number,
              town: event.town,
              flat: event.flat,
              gate: event.gate,
            },
          ],
        },
        water_meter: { code: event.code },
      })
      .subscribe((value) => {
        this.router.navigate[('/viviendas')]
      });
  }
}
