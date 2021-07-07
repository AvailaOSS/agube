import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgubeRoute } from '../../../agube-route';
import { DwellingService, UserDetail } from '@availa/agube-rest-api';

@Component({
  selector: 'app-dwelling-management-detail-card',
  templateUrl: './dwelling-management-detail-card.component.html',
  styleUrls: ['./dwelling-management.component.scss'],
})
export class DwellingManagementDetailCardComponent
  implements OnInit {
  // TODO: rename it to DwellingResidentDetailCard

  @Input() dwellingId: number;
  public resident: UserDetail;
  public userId: string;

  constructor(
    private readonly svcRouter: Router,
    private readonly svcDwelling: DwellingService
  ) {
    //
  }

  ngOnInit(): void {
    this.svcDwelling.getCurrentResident(this.dwellingId).subscribe(result => this.resident = result.user);
  }

  public changeResident(): void {
    this.svcRouter.navigate([AgubeRoute.CHANGE_RESIDENT], {
      queryParams: { data: this.dwellingId },
    });
  }

  public changeOwner(): void {
    this.svcRouter.navigate([AgubeRoute.CHANGE_OWNER], {
      queryParams: { data: this.dwellingId },
    });
  }

  public changePay(): void {
    this.svcRouter.navigate([AgubeRoute.CHANGE_PAYMASTER], {
      queryParams: { data: this.dwellingId },
    });
  }
}
