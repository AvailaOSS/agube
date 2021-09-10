import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { DwellingService, WaterMeterMeasurement } from "@availa/agube-rest-api";
import { Header } from "@availa/table/lib/header";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { format } from "date-fns";
import { BehaviorSubject } from "rxjs";
import { WaterMeterReadingComponent } from "src/app/agube/water-meter/water-meter-reading/water-meter-reading.component";

@Component({
  selector: "app-dwelling-water-meter-readings-detail-card",
  templateUrl: "./dwelling-water-meter-readings-detail-card.component.html",
  styleUrls: ["./dwelling-water-meter-readings-detail-card.component.scss"],
})
export class DWellingWaterMeterReadingsComponent implements OnInit, OnChanges {
  @Input() public dwellingId: number;
  private chunk = 8;
  public datasource: BehaviorSubject<WaterMeterMeasurement[]>;
  public tableHeader: BehaviorSubject<Header[]>;

  constructor(
    private readonly svcDwelling: DwellingService,
    private modalService: NgbModal
  ) {
    this.tableHeader = new BehaviorSubject<Header[]>([
      {
        columnDataName: "measurement",
        columnName: "Lecturas",
      },
      {
        columnDataName: "date",
        columnName: "Fecha",
      },
    ]);
  }

  public ngOnInit(): void {
    this.svcDwelling
      .getCurrentWaterMeterMeasuresChunk(
        String(this.chunk),
        String(this.dwellingId)
      )
      .subscribe((result) => {
        const measurements: any = result.water_meter;
        measurements.map((val) => {
          val.date = format(new Date(val.date), "HH:mm - dd/MM/yyyy");
        });
        this.datasource = new BehaviorSubject<WaterMeterMeasurement[]>(
          measurements
        );
      });
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  public addReading(): void {
    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.dwellingId)
      .subscribe((value) => {
        const modal: NgbModalRef = this.modalService.open(
          WaterMeterReadingComponent,
          {
            centered: true,
            backdrop: "static",
          }
        );
        modal.componentInstance.id = value.id;
        modal.result.then(
          (result) => {
            this.ngOnInit();
          },
          (reason) => {
            //
          }
        );
      });
  }
}
