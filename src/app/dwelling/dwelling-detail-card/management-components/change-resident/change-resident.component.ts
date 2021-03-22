import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-change-resident',
  templateUrl: './change-resident.component.html',
  styleUrls: ['./change-resident.component.scss'],
})
export class ChangeResidentComponent implements OnInit {
  public residentId: string;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly svcChangeResident: DwellingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.residentId = params.data;
    });
    this.svcChangeResident
      .getCurrentResident(+this.residentId)
      .subscribe((value) => {
        this.formConfigurationData.emit(value);
      });
  }

  public ngOnInit(): void {}
  public sendForm(event: any): void {
    console.log('change resident', event);
    this.svcChangeResident
      .changeCurrentResident(+this.residentId, {
        user: {
          address: [
            {
              address: {
                street: event.address,
                town: event.town,
                is_external: true,
              },
              number: event.number,
              flat: event.flat,
              gate: event.gate,
            },
          ],
          username: event.usernameRes,
          phones: [
            {
              phone_number: event.phonesRes,
            },
          ],
          email: event.emailRes,
          first_name: event.fist_nameRes,
          last_name: event.last_nameRes,
        },
      })
      .subscribe((value) => {
        this.router.navigate(['/viviendas']);
      });
  }
}
