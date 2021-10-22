import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaterMeter, WaterMeterMeasurement } from '@availa/agube-rest-api';
import { Header } from '@availa/table/lib/header';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { AgubeRoute } from '../../agube-route';
import { WaterMeterReadingSetterComponent } from '../water-meter-reading-setter/water-meter-reading-setter.component';
import { WaterMeterType } from '../water-meter-type.enum';
import { WaterMeterManager } from '../water-meter.manager';

@Component({
  selector: 'app-water-meter-reading-detail-card',
  templateUrl: './water-meter-reading-detail-card.component.html',
  styleUrls: ['./water-meter-reading-detail-card.component.scss'],
})
export class WaterMeterReadingsComponent implements OnInit, OnChanges {
  @Input() public parentId: number;
  @Input() public parentType: WaterMeterType;
  public waterMeter: WaterMeter | undefined;
  private chunk = 8;
  public datasource: BehaviorSubject<WaterMeterMeasurement[]>;
  public tableHeader: BehaviorSubject<Header[]>;

  constructor(
    private readonly managerWaterMeter: WaterMeterManager,
    private modalService: NgbModal,
    private readonly svcRouter: Router
  ) {
    this.tableHeader = new BehaviorSubject<Header[]>([
      {
        columnDataName: 'measurement',
        columnName: 'Lecturas',
      },
      {
        columnDataName: 'date',
        columnName: 'Fecha',
      },
    ]);
  }

  public ngOnInit(): void {
    this.managerWaterMeter
      .get(this.parentId, this.parentType)
      .subscribe((response) => (this.waterMeter = response));
    this.managerWaterMeter
      .getChunk(this.parentId, this.chunk, this.parentType)
      .subscribe((result) => {
        const measurements: any = result.measures;
        measurements.map((val) => {
          val.date = format(new Date(val.date), 'HH:mm - dd/MM/yyyy');
        });
        this.datasource = new BehaviorSubject<WaterMeterMeasurement[]>(
          measurements
        );
      });
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  public changeWaterMeter(): void {
    // FIXME: WaterMeterRoute instead of AgubeRoute
    const parameters = { id: this.parentId, type: this.parentType };
    console.log('Los parametros enviados son', parameters);
    this.svcRouter.navigate([AgubeRoute.CHANGE_WATER_METER], {
      queryParams: parameters,
    });
  }

  public addReading(): void {
    const modal: NgbModalRef = this.modalService.open(
      WaterMeterReadingSetterComponent,
      {
        centered: true,
        backdrop: 'static',
      }
    );
    modal.componentInstance.id = this.waterMeter.id;
    modal.result.then(
      (result) => {
        this.ngOnInit();
      },
      (reason) => {
        //
      }
    );
  }
}
