import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservoirService } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { User } from '@availa/auth-fe/lib/login/models/user';
import { NotificationService } from '@availa/notification';
import { AgubeRoute } from '../../agube-route';

@Component({
  selector: 'app-create-reservoir',
  templateUrl: './create-reservoir.component.html',
  styleUrls: ['./create-reservoir.component.scss'],
})
export class CreateReservoirComponent {
  // FIXME: styleUrls is duplicated of change-person.component.scss
  title = 'Alta Depósito';
  reservoirForm: FormGroup;
  userForm: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    public readonly router: Router,
    public readonly svcAlert: NotificationService,
    public readonly svcReservoir: ReservoirService,
    public readonly svcAccount: AccountService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.svcAccount.getUser().subscribe((response) => {
      // FIXME: backend/reservoir does not require fields: number, inet_flow and outlet_flow
      this.reservoirForm = this.formBuilder.group({
        full_address: this.formBuilder.group({
          address: this.formBuilder.group({
            town: ['', Validators.required],
            street: ['', Validators.required],
            is_external: [false, Validators.required],
          }),
          number: [''],
          flat: [],
          gate: [],
        }),
        user_id: [response.user_id, Validators.required],
        water_meter: this.formBuilder.group({
          code: ['', Validators.required],
        }),
        capacity: ['', Validators.required],
        inlet_flow: [''],
        outlet_flow: [''],
      });
    });
  }

  public onSubmit(): void {
    this.svcReservoir.createReservoir(this.reservoirForm.value).subscribe(
      () => this.router.navigate([AgubeRoute.RESERVOIR]),
      (err) =>
        this.svcAlert.error(JSON.stringify(err.error), {
          autoClose: false,
          keepAfterRouteChange: false,
        })
    );
  }
}
