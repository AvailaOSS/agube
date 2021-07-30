import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService, Resident } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../../../../agube-route';
import { NotificationService } from '@availa/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-resident',
  templateUrl: './change-resident.component.html',
  styleUrls: ['./change-resident.component.scss'],
})
export class ChangeResidentComponent implements OnInit {
  @Input() titleFormResident?: string = 'Cambio de residente';
  public residentFormGroup: FormGroup;
  public submitted = false;
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  public residentId: string;
  public userId: string;
  public residentData: any;

  public name: string;
  public lastName: string;
  public email: string;
  public username: string;
  public phone: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly svcRouter: Router,
    private readonly svcChangeResident: DwellingService,
    private readonly alertService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe((params) => {
      this.residentId = params.data;
      this.userId = params.user_id;
    });
    this.svcChangeResident
      .getCurrentResident(+this.residentId)
      .subscribe((value: Resident) => {
        this.residentData = value;
        this.name = value.user.first_name;
        this.lastName = value.user.last_name;
        this.email = value.user.email;
        this.username = value.user.username;
        value.user.phones.map((ph) => {
          this.phone = ph.phone_number;
        });
      });
  }
  get f() {
    return this.residentFormGroup.controls;
  }
  public ngOnInit(): void {
    this.residentFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.svcChangeResident
      .changeCurrentResident(+this.residentId, {
        user: {
          address: [
            {
              address: {
                street: this.residentData.user.address[0].address.street,
                town: this.residentData.user.address[0].address.town,
                is_external: true,
              },
              number: +this.residentData.user.address[0].number,
              flat: this.residentData.user.address[0].flat,
              gate: this.residentData.user.address[0].gate,
            },
          ],
          username: this.residentFormGroup.value.username,
          phones: [
            {
              phone_number: this.residentFormGroup.value.phone,
            },
          ],
          email: this.residentFormGroup.value.email,
          first_name: this.residentFormGroup.value.name,
          last_name: this.residentFormGroup.value.lastName,
        },
      })
      .subscribe(
        () => {
          this.svcRouter.navigate([AgubeRoute.DWELLING]);
        },
        (error) => {
          console.log(error);
          this.alertService.error('Error al actualizar', error.error.status);
        }
      );
  }
}
