import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { ReservoirCreate } from '../../../../../../apiaux/agube-rest-api-lib/src/lib/model/reservoirCreate';

@Component({
  selector: 'app-deposit-management',
  templateUrl: './deposit-management.component.html',
  styleUrls: ['./deposit-management.component.scss'],
})
export class DepositManagementComponent implements OnInit {
  @Input() reservoir: ReservoirCreate;
  @Input() waterMeter: string;
  public user_id: string;
  constructor(
    private readonly svcRouter: Router,
    private readonly svcManager: ManagerService
  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.user_id = value.user_id;
    });
  }

  public ngOnInit(): void {}
  public ngOnChanges(): void {
    console.log(this.reservoir);
    console.log(this.waterMeter);
  }

  public changeReservoir(): void {
    this.svcRouter.navigate(['/deposit/changeReservoir'], {
      queryParams: { data: this.reservoir.id, user_id: this.user_id },
    });
  }
  public changeOwner(): void {
    this.svcRouter.navigate(['/vivienda/propietario'], {
      queryParams: { data: this.reservoir.id, user_id: this.user_id },
    });
  }
  public changePay(): void {
    this.svcRouter.navigate(['/vivienda/cambio/pagador'], {
      queryParams: { data: this.reservoir.id, user_id: this.user_id },
    });
  }
}
