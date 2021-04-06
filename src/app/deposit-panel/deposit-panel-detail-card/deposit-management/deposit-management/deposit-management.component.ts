import { ReservoirDetail } from './../../../../../../apiaux/agube-rest-api-lib/src/lib/model/reservoirDetail';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService, ReservoirCreate, ReservoirService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-deposit-management',
  templateUrl: './deposit-management.component.html',
  styleUrls: ['./deposit-management.component.scss'],
})
export class DepositManagementComponent implements OnInit {
  @Input() reservoir: ReservoirCreate;
  @Input() waterMeter: string;
  // tslint:disable-next-line: variable-name
  public user_id: string;
  public reservoirWaterMeter: ReservoirDetail;
  constructor(
    private readonly svcRouter: Router,
    private readonly svcManager: ManagerService,

  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.user_id = value.user_id;
    });

  }

  public ngOnInit(): void {}

  public changeReservoir(): void {
    this.svcRouter.navigate(['/deposit/changeReservoir'], {
      queryParams: { data: this.reservoir.id, user_id: this.user_id },
    });
  }
}
