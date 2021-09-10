import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  WaterMeterMeasurement,
  ReservoirService,
} from '@availa/agube-rest-api';
import { Header } from '@availa/table/lib/header';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { isUndefined } from 'lodash';
import { format } from 'date-fns';
import { WaterMeterReadingComponent } from 'src/app/agube/water-meter/water-meter-reading/water-meter-reading.component';

@Component({
  selector: 'app-reservoir-water-meter-readings-detail-card',
  templateUrl: './reservoir-water-meter-readings-detail-card.component.html',
  styleUrls: ['./reservoir-water-meter-readings-detail-card.component.scss'],
})
export class ReservoirWaterMeterReadingsDetailCardComponent
  implements OnInit, OnChanges
{
  @Input() public reservoirId: number;
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
    private readonly svcReservoir: ReservoirService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.svcReservoir
      .getReservoirCurrentWaterMeterMeasuresChunk(
        String(this.chunk),
        String(this.reservoirId)
      )
      .subscribe((result) => {
        if (!isUndefined(result)) {
          const measurements: any = result.water_meter;
          measurements.map((val) => {
            val.date = format(new Date(val.date), 'dd/MM/yyyy');
          });

          this.datasource = new BehaviorSubject<WaterMeterMeasurement[]>(
            measurements
          );
        }
      });
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  public addReading(): void {
    this.svcReservoir
      .getCurrentReservoirWaterMeter(this.reservoirId)
      .subscribe((value) => {
        const modal: NgbModalRef = this.modalService.open(
          WaterMeterReadingComponent,
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
