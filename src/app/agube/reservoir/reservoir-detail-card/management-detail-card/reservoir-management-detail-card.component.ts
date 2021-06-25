import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgubeRoute } from '../../../agube-route';
import {
  ManagerService,
  ReservoirCreate,
  ReservoirDetail,
} from '@availa/agube-rest-api';

@Component({
  selector: 'app-reservoir-management-detail-card',
  templateUrl: './reservoir-management-detail-card.component.html',
})
export class ReservoirManagementComponent implements OnInit {
  @Input() reservoir: ReservoirCreate;
  @Input() waterMeter: string;

  public user_id: string;
  public reservoirWaterMeter: ReservoirDetail;

  constructor(
    private readonly svcRouter: Router,
    private readonly svcManager: ManagerService
  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.user_id = value.user_id;
    });
  }

  public ngOnInit(): void {}

  public changeReservoir(): void {
    this.svcRouter.navigate([AgubeRoute.CHANGE_RESERVOIR], {
      queryParams: { data: this.reservoir.id, user_id: this.user_id },
    });
  }
}
