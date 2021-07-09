import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { isUndefined } from 'lodash';
import {
  ReservoirCreate,
  ReservoirService,
  WaterMeter,
} from '@availa/agube-rest-api';

@Component({
  selector: 'app-reservoir-data-detail-card',
  templateUrl: './reservoir-data-detail-card.component.html',
})
export class ReservoirDataComponent implements OnInit, OnChanges {
  @Input() reservoirId: number;
  public reservoir: ReservoirCreate = {
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
  public userId: string;

  constructor(private readonly svcReservoir: ReservoirService) {}
  public ngOnChanges(): void {
    this.ngOnInit();
  }
  public ngOnInit(): void {
    if (!isUndefined(this.reservoirId)) {
      this.svcReservoir.getReservoir(this.reservoirId).subscribe((result) => {
        if (!isUndefined(result)) {
          this.reservoir = result;
        }
      });
    }
  }
}
