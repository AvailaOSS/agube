import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ReservoirDetail, ReservoirService } from '@availa/agube-rest-api';

import { AgubeRoute } from '../../agube-route';
import { TableDataSourceService } from '@availa/table';

interface DReservoirTableDataSource {
  readonly id?: string;
  water_meter_code: string;
  street: string;
  number: string;
  flat: string;
  gate: string;
  town: string;
  resident_first_name: string;
  resident_phone: string;
}
@Component({
  selector: 'app-reservoir-detail-list',
  templateUrl: './reservoir-detail-list.component.html',
  styleUrls: ['./reservoir-detail-list.component.scss'],
})
export class ReservoirDetailListComponent implements OnInit {
  @Output() sendSelected: EventEmitter<ReservoirDetail> =
    new EventEmitter<ReservoirDetail>();
  public dataSource: ReservoirDetail[] = [];
  public valuesReservoir: string[] = [];
  public selectedRowIndex = '';
  public address: string;
  public data: string;
  public tableHeader: string[] = [
    'id',
    'Calle',
    'Número',
    'Piso',
    'Puerta',
    'Ciudad',
    'Capacidad',
    'inlet_flow',
    'outlet_flow',
  ];

  constructor(
    private readonly svcReservoirService: ReservoirService,
    private readonly router: Router,
    private svcTableService: TableDataSourceService
  ) {}

  ngOnInit(): void {
    this.svcReservoirService.getReservoirs().subscribe((value) => {
      this.valuesReservoir = Object.keys(value[0]);
      this.svcTableService.addDataSource(value);
      this.svcTableService.addHeader(this.tableHeader);
    });
  }

  public selectRow(row: any): void {

    const result: ReservoirDetail = row.reduce(
      (result: any, field: any, index: any) => {
        result[this.valuesReservoir[index]] = field;

        return result;
      },
      {}

    );
    this.sendSelected.emit(result);
  }
  public addNewReservoir(): void {
    this.router.navigate([AgubeRoute.CREATE_RESERVOIR]);
  }


}
