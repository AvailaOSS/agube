import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DwellingService, WaterMeter, WaterMeterService } from '@availa/agube-rest-api';
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
  public keysDwelling: string[] = [];
  public valuesWaterMeter: any[] = [];
  public selectedRowIndex = '';
  public address: string;
  public data: string;
  public displayedColumns: string[] = ['reading', 'date'];
  public datasource: BehaviorSubject<any>;
  public tableHeader: BehaviorSubject<Header[]> = new BehaviorSubject<Header[]>(
    [
      {
        columnDataName: 'code',
        columnName: 'Código Contador',
      },
      {
        columnDataName: 'release_date',
        columnName: 'Fecha',
      },
      {
        columnDataName: 'water_meter',
        columnName: 'Lecturas',
      },
    ]
  );

  constructor(
    private readonly svcDwelling: DwellingService,
    private readonly svcWaterMeter: WaterMeterService,
    private modalService: NgbModal
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!isUndefined(changes.dwelling.currentValue)) {
      console.log(changes.dwelling.currentValue.id)
      this.svcWaterMeter
      .getWaterMeterMeasures(changes.dwelling.currentValue.id)
      .subscribe((value) => {
        this.datasource = new BehaviorSubject<any[]>([value]);
        this.keysDwelling = Object.keys(value);
        this.valuesWaterMeter = Object.values(value);
      });
    }
  }

  public ngOnInit(): void {
    this.svcWaterMeter
      .getWaterMeterMeasures(this.dwelling.id)
      .subscribe((value) => {
        this.datasource = new BehaviorSubject<any[]>([value]);
        this.keysDwelling = Object.keys(value);
        this.valuesWaterMeter = Object.values(value);
      });
  }
  public selectRow(evt: any): void {
    //
  }
  public addNew(): void {
    this.modalService
      .open(NewWaterFormComponent, {
        centered: true,
        backdrop: 'static',
      })
      .result.then((result) => {
        this.valuesWaterMeter.push(result);
        this.datasource = new BehaviorSubject<any[]>(this.valuesWaterMeter);
      });
  }

}
