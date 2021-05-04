import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ManagerService,
  ReservoirService,
} from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-create-reservoir',
  templateUrl: './create-reservoir.component.html',
  styleUrls: ['./create-reservoir.component.scss'],
})
export class CreateReservoirComponent implements OnInit {
  public error = true;
  public username: string;
  public userId: string;

  constructor(
    private router: Router,
    private readonly svcCreateNewReservoir: ReservoirService,
    private readonly svcManager: ManagerService
  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
    });
  }

  public ngOnInit(): void {}

  public sendForm(event: any): void {
    this.svcCreateNewReservoir
      .createReservoir({
        user_id: +this.userId,
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
        capacity: event.capacity,
        outlet_flow: event.outlet_flow,
        inlet_flow: event.inlet_flow,
        water_meter: { code: event.code },
      })
      .subscribe(
        (value) => {
          this.router.navigate(['/depositos']);
        },
        (error) => {
          this.error = false;
        }
      );
  }
}
