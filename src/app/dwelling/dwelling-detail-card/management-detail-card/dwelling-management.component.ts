import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DwellingDetail,
  ManagerService,
} from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-dwelling-management-detail-card',
  templateUrl: './dwelling-management-detail-card.component.html',
})
export class DwellingManagementDetailCardComponent
  implements OnInit, OnChanges {
  @Input() dwelling: DwellingDetail;
  @Input() waterMeter: string;
  public userId: string;

  constructor(
    private readonly svcRouter: Router,
    private readonly svcManager: ManagerService
  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
    });
  }

  ngOnInit(): void {}

  public ngOnChanges(): void {}

  public changeCount(): void {
    this.svcRouter.navigate(['/vivienda/cambio/contador'], {
      queryParams: { data: this.dwelling.id, user_id: this.userId },
    });
  }

  public changeResident(): void {
    this.svcRouter.navigate(['/vivienda/residente'], {
      queryParams: { data: this.dwelling.id, user_id: this.userId },
    });
  }

  public changeOwner(): void {
    this.svcRouter.navigate(['/vivienda/propietario'], {
      queryParams: { data: this.dwelling.id, user_id: this.userId },
    });
  }

  public changePay(): void {
    this.svcRouter.navigate(['/vivienda/cambio/pagador'], {
      queryParams: { data: this.dwelling.id, user_id: this.userId },
    });
  }
}
