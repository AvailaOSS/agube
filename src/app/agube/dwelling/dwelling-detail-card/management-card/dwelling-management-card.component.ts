import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DwellingService, UserDetail } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../../agube-route';

@Component({
  selector: 'app-dwelling-management-card',
  templateUrl: './dwelling-management-card.component.html',
})
export class DwellingManagementCard implements OnInit {
  @Input() dwellingId: number;
  public resident: UserDetail = undefined;
  public owner: any = undefined;
  public userId: string;
  public dynamicTitle = 'Sin Residente';
  public dynamicLabelResident = 'Añadir';
  public dynamicLabelOwner = 'Añadir';

  constructor(
    private readonly svcRouter: Router,
    private readonly svcDwelling: DwellingService
  ) {
    //
  }

  public ngOnInit(): void {
    this.svcDwelling.getCurrentResident(this.dwellingId).subscribe((result) => {
      this.resident = result.user;
      this.dynamicTitle = 'Residente';
      this.dynamicLabelResident = 'Cambiar';
    });
    this.svcDwelling
      .getCurrentOwner(this.dwellingId)
      .subscribe((result) => (this.dynamicLabelOwner = 'Cambiar'));
  }

  public ngOnChanges(): void {
    this.ngOnInit();
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
}
