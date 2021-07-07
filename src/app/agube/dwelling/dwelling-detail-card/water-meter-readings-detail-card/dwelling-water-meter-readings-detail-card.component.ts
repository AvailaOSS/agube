import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  DwellingService,
  WaterMeter,
  WaterMeterService,
} from '@availa/agube-rest-api';
import { BehaviorSubject } from 'rxjs';
import { Header } from '@availa/table/lib/header';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewWaterFormComponent } from './new-water-meter-form/new-water-form/new-water-form.component';
import { isUndefined } from 'lodash';

@Component({
  selector: 'app-dwelling-water-meter-readings-detail-card',
  templateUrl: './dwelling-water-meter-readings-detail-card.component.html',
  styleUrls: ['./dwelling-water-meter-readings-detail-card.component.scss'],
})
export class DWellingWaterMeterReadingsComponent implements OnInit, OnChanges {
  @Input() public dwelling: any;
  @Output() sendSelected: EventEmitter<WaterMeter> =
    new EventEmitter<WaterMeter>();
  public keysWater: string[] = [];
  public valuesWaterMeter: any[] = [];
  public selectedRowIndex = '';
  public address: string;
  public data: string;
  public displayedColumns: string[] = ['reading', 'date'];
  public datasource: BehaviorSubject<any>;
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
    private readonly svcWaterMeter: WaterMeterService,
    private modalService: NgbModal
  ) {}
  public ngOnChanges(changes: SimpleChanges): void {
    if (!isUndefined(changes.dwelling.currentValue)) {
      this.svcDwelling
        .getCurrentDwellingWaterMeter(changes.dwelling.currentValue.id)
        .subscribe((value) => {
          if (!isUndefined(value)) {
            this.svcWaterMeter
              .getWaterMeterMeasures(value.id)
              .subscribe((water) => {
                this.datasource = new BehaviorSubject<any[]>(water);
                this.keysWater = Object.keys(water);
                this.valuesWaterMeter = Object.values(water);
              });
          }
        });
    }
  }

  public ngOnInit(): void {
    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.dwelling.id)
      .subscribe((value) => {
        if (!isUndefined(value)) {
          this.svcWaterMeter
            .getWaterMeterMeasures(value.id)
            .subscribe((waters) => {
              this.datasource = new BehaviorSubject<any[]>(waters);
              this.keysWater = Object.keys(waters);
              this.valuesWaterMeter = Object.values(waters);
            });
        }
      });
  }
  public selectRow(evt: any): void {
    //
  }
  public addNew(): void {
    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.dwelling.id)
      .subscribe((value) => {
        this.modalService.open(NewWaterFormComponent, {
          centered: true,
          backdrop: 'static',
        }).componentInstance.id = value.id;

      });
  }
}
