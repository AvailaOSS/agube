import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { DwellingCreate, DwellingService } from "@availa/agube-rest-api";
import { WaterMeterEnabledDetailCardComponent } from "./water-meter-enabled-detail-card/water-meter-enabled-detail-card.component";

@Component({
  selector: "app-dwelling-detail-card",
  templateUrl: "./dwelling-detail-card.component.html",
  styleUrls: ["./dwelling-detail-card.component.scss"],
})
export class DwellingDetailCardComponent implements OnInit, OnChanges {
  @Input() public dwellingId: number;
  public dwelling: DwellingCreate | undefined;
  public sendWaterMeterCode: WaterMeterEnabledDetailCardComponent;

  constructor(private readonly svcDwelling: DwellingService) {
    //
  }

  ngOnInit(): void {
    this.svcDwelling
      .getDwelling(this.dwellingId)
      .subscribe((result) => (this.dwelling = result));
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }

  public sendWater(event: any): void {
    this.sendWaterMeterCode = event;
  }
}
