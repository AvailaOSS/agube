import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AgubeRoute } from '../../../agube-route';
import { DwellingService, UserDetail } from '@availa/agube-rest-api';

@Component({
  selector: 'app-dwelling-management-detail-card',
  templateUrl: './dwelling-management-detail-card.component.html',
})
export class DwellingResidentDetailCard implements OnInit, OnChanges {
  @Input() dwellingId: number;
  public resident: UserDetail;
  public userId: string;

  constructor(
    private readonly svcRouter: Router,
    private readonly svcDwelling: DwellingService
  ) {
    //
  }
  public ngOnChanges(): void {
    this.ngOnInit();
  }
  public ngOnInit(): void {
    this.svcDwelling
      .getCurrentResident(this.dwellingId)
      .subscribe((result) => (this.resident = result.user));
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
