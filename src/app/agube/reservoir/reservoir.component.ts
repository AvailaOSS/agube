import { Component, OnInit } from "@angular/core";
import { ReservoirDetail } from "@availa/agube-rest-api";

@Component({
  selector: "app-reservoir",
  templateUrl: "./reservoir.component.html",
  styleUrls: ["./reservoir.component.scss"],
})
export class ReservoirComponent implements OnInit {
  public reservoirId: number;

  constructor() {}

  ngOnInit(): void {}

  public selectItem(reservoir: ReservoirDetail): void {
    this.reservoirId = +reservoir.id;
  }
}
