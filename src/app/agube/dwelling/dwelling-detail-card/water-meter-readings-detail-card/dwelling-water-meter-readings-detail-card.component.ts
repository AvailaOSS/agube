import { Component, Input, OnInit } from '@angular/core';
import { DwellingService, WaterMeterMeasurement } from '@availa/agube-rest-api';
import { BehaviorSubject } from 'rxjs';
import { Header } from '@availa/table/lib/header';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OnChanges } from '@angular/core';
import { format } from 'date-fns';
import { NewWaterFormComponent } from 'src/app/agube/new-water-meter-form/new-water-form/new-water-form.component';
@Component({
  selector: 'app-dwelling-water-meter-readings-detail-card',
  templateUrl: './dwelling-water-meter-readings-detail-card.component.html',
  styleUrls: ['./dwelling-water-meter-readings-detail-card.component.scss'],
})
export class DWellingWaterMeterReadingsComponent implements OnInit, OnChanges {
  @Input() public dwellingId: number;
  private chunk = 8;

  public datasource: BehaviorSubject<WaterMeterMeasurement[]>;
  public tableHeader: BehaviorSubject<Header[]> = new BehaviorSubject<Header[]>(
    [
      {
        columnDataName: 'measurement',
        columnName: 'Lecturas',
      },
      {
        columnDataName: 'date',
        columnName: 'Fecha',
      },
    ]
  );

  constructor(
    private readonly svcDwelling: DwellingService,
    private modalService: NgbModal
  ) {
    //
  }
  ngOnChanges(): void {
    this.ngOnInit();
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
          val.date = format(new Date(val.date), 'dd/MM/yyyy');
        });
        this.datasource = new BehaviorSubject<WaterMeterMeasurement[]>(
          measurements
        );
      });
  }
  public addReading(): void {
    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.dwellingId)
      .subscribe((value) => {
        const modal: NgbModalRef = this.modalService.open(
          NewWaterFormComponent,
          {
            centered: true,
            backdrop: 'static',
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
