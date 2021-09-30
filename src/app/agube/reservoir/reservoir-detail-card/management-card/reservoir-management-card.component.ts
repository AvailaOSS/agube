import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { ReservoirCreate, ReservoirService } from "@availa/agube-rest-api";
import { isUndefined } from "lodash";

@Component({
  selector: "app-reservoir-management-card",
  templateUrl: "./reservoir-management-card.component.html",
})
export class ReservoirManagementComponent implements OnInit, OnChanges {
  @Input() reservoirId: number;
  public reservoir: ReservoirCreate;

  constructor(private readonly svcReservoir: ReservoirService) {
    this.reservoir = {
      full_address: {
        address: { street: "", town: "" },
        number: 0,
      },
      user_id: 0,
      water_meter: { code: "", discharge_date: "" },
      capacity: "",
      inlet_flow: "",
      outlet_flow: "",
    };
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

  public ngOnChanges(): void {
    this.ngOnInit();
  }
}
