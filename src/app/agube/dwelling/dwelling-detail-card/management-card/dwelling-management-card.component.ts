import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DwellingService, UserDetail } from "@availa/agube-rest-api";
import { AgubeRoute } from "../../../agube-route";

@Component({
  selector: "app-dwelling-management-card",
  templateUrl: "./dwelling-management-card.component.html",
})
export class DwellingManagementCard implements OnInit, OnChanges {
  @Input() dwellingId: number;
  public resident: UserDetail = undefined;
  public userId: string;
  public dynamicTitle =
    this.resident === undefined ? "Sin Residente" : "Residente";
  public dynamicLabel = this.resident === undefined ? "Añadir" : "Cambiar";

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
}
