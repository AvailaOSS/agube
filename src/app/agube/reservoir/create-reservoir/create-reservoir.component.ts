import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService, ReservoirService } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../agube-route';
import { NotificationService } from '@availa/notification';

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
    private readonly svcManager: ManagerService,
    private readonly alertService: NotificationService
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
          this.alertService.success('Cambiado con éxito');
          // this.router.navigate([AgubeRoute.RESERVOIR]);
        },
        (error) => {
          // FIXME: throw Notification Service
          this.error = false;
        }
      );
  }
}
