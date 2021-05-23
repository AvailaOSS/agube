import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../../../../agube-route';
import { NotificationService } from '@availa/notification';

@Component({
  selector: 'app-change-resident',
  templateUrl: './change-resident.component.html',
  styleUrls: ['./change-resident.component.scss'],
})
export class ChangeResidentComponent implements OnInit {
  public residentId: string;
  public userId: string;
  public error = true;
  public errorMessage: string;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly svcChangeResident: DwellingService,
    private readonly alertService: NotificationService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.residentId = params.data;
      this.userId = params.user_id;
    });
    this.svcChangeResident
      .getCurrentResident(+this.residentId)
      .subscribe((value) => {
        this.formConfigurationData.emit(value);
      });
  }

  public ngOnInit(): void {}

  public sendForm(event: any): void {
    this.svcChangeResident
      .changeCurrentResident(+this.residentId, {
        user: {
          address: [
            {
              address: {
                street: event.addressRes,
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
          first_name: event.first_nameRes,
          last_name: event.last_nameRes,
        },
      })
      .subscribe(
        (value) => {
          this.alertService.success('Actualizado con éxito');
        },
        (error) => {
          this.error = false;
          this.errorMessage = error;
          this.alertService.error('Error al actualizar' + error.error.status);
        }
      );
  }
}
