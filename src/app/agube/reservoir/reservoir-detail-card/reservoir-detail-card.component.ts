import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { ReservoirCreate, ReservoirService } from "@availa/agube-rest-api";

@Component({
  selector: "app-reservoir-detail-card",
  templateUrl: "./reservoir-detail-card.component.html",
  styleUrls: ["./reservoir-detail-card.component.scss"],
})
export class ReservoirDetailCardComponent implements OnInit, OnChanges {
  public reservoir: ReservoirCreate | undefined;
  @Input() public reservoirId: number;

  constructor(private readonly svcReservoirService: ReservoirService) {
    //
  }

  ngOnInit(): void {
    this.svcReservoirService
      .getReservoir(this.reservoirId)
      .subscribe((result) => (this.reservoir = result));
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }
}
