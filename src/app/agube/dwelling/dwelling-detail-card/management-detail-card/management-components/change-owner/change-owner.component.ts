import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from '@availa/agube-rest-api';

@Component({
  selector: 'app-change-owner',
  templateUrl: './change-owner.component.html',
  styleUrls: ['./change-owner.component.scss'],
})
export class ChangeOwnerComponent implements OnInit {
  public ownerId: string;
  public userId: string;
  public error = true;
  public errorMessage: string;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly svcChangeOwner: DwellingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.ownerId = params.data;
      this.userId = params.user_id;
    });
    this.svcChangeOwner.getCurrentOwner(+this.ownerId).subscribe((value) => {
      this.formConfigurationData.emit(value);
    });
  }

  public ngOnInit(): void {}

  public sendForm(event: any): void {
    this.svcChangeOwner
      .changeCurrentOwner(+this.ownerId, {
        user: {
          address: [
            {
              address: {
                street: event.addressOwner,
                town: event.town,
                is_external: true,
              },
              number: event.number,
              flat: event.flat,
              gate: event.gate,
            },
          ],
          username: event.username,
          phones: [
            {
              phone_number: event.phones,
            },
          ],
          email: event.email,
          first_name: event.first_name,
          last_name: event.last_name,
        },
      })
      .subscribe(
        (value) => {
          this.router.navigate(['/viviendas']);
        },
        (error) => {
          this.error = false;
          this.errorMessage = error;
        }
      );
  }
}
