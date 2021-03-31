import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ManagerService,
  ReservoirService,
} from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: '',
  templateUrl: './addReservoir.component.html',
  styleUrls: ['./addReservoir.component.scss'],
})
export class AddReservoirComponent implements OnInit {
  public error: boolean = true;
  public username: string;
  public user_id: string;
  constructor(
    private router: Router,
    private readonly svcCreateNewReservoir: ReservoirService,
    private readonly svcManager: ManagerService
  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.user_id = value.user_id;
    });
  }

  public ngOnInit(): void {}
  public sendForm(event: any): void {
    console.log(event);
    this.svcCreateNewReservoir
      .createReservoir({
        user_id: +this.user_id,
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
        capacity: '200',
        outlet_flow: '2',
        inlet_flow: '21',
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
