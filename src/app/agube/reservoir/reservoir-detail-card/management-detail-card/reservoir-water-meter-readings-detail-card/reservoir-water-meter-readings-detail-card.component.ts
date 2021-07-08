import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  WaterMeterMeasurement,
  WaterMeterWithMeasurements,
  ReservoirService,
} from '@availa/agube-rest-api';
import { Header } from '@availa/table/lib/header';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { NewWaterFormComponent } from 'src/app/agube/dwelling/dwelling-detail-card/water-meter-readings-detail-card/new-water-meter-form/new-water-form/new-water-form.component';

@Component({
  selector: 'app-reservoir-water-meter-readings-detail-card',
  templateUrl: './reservoir-water-meter-readings-detail-card.component.html',
  styleUrls: ['./reservoir-water-meter-readings-detail-card.component.scss'],
})
export class ReservoirWaterMeterReadingsDetailCardComponent implements OnInit,OnChanges {
  @Input() public reservoirId: number;
  private chunk = 8;
  private waterMeterWithMeasurements: WaterMeterWithMeasurements;

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
      this.waterMeterWithMeasurements = result;
      const measurements = this.waterMeterWithMeasurements.water_meter;
      this.datasource = new BehaviorSubject<WaterMeterMeasurement[]>(
        measurements
      );
    });
  }
  ngOnChanges(): void {
    this.ngOnInit();
  }
  // FIXME ... USAR COMPONENTE DIFERENTE PARA EL FORMULARIO??????
  public addReading(): void {
    this.svcReservoir
      .getCurrentReservoirWaterMeter(this.reservoirId)
      .subscribe((value) => {
        const modal: NgbModalRef = this.modalService.open(NewWaterFormComponent, {
          centered: true,
          backdrop: 'static',
        });
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
