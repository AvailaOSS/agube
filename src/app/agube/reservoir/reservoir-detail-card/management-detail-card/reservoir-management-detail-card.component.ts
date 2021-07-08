import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AgubeRoute } from '../../../agube-route';
import { isUndefined } from 'lodash';
import {
  ReservoirCreate,
  ReservoirService,
} from '@availa/agube-rest-api';

@Component({
  selector: 'app-reservoir-management-detail-card',
  templateUrl: './reservoir-management-detail-card.component.html',
})
export class ReservoirManagementComponent implements OnInit, OnChanges {
  @Input() reservoirId: number;
  public reservoir: ReservoirCreate;
  public userId: string;

  constructor(
    private readonly svcRouter: Router,
    private readonly svcReservoir: ReservoirService
  ) {}
  public ngOnChanges(): void {
    this.ngOnInit();
  }
  public ngOnInit(): void {
    if (!isUndefined(this.reservoirId)) {
      this.reservoir = {
        full_address: {
          address: { street: '', town: '' },
          number: 0,
        },
        user_id: 0,
        water_meter: { code: '', discharge_date: '' },
        capacity: '',
        inlet_flow: '',
        outlet_flow: '',
      };
      this.svcReservoir.getReservoir(this.reservoirId).subscribe((result) => {
        if (!isUndefined(result)) {
          this.reservoir = result;
        }
      });
    }
  }

  public changeReservoir(): void {
    this.svcRouter.navigate([AgubeRoute.CHANGE_RESERVOIR], {
      queryParams: { data: this.reservoirId },
    });
  }
}
