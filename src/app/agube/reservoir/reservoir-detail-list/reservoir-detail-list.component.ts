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
import { Header } from '@availa/table/lib/header';
import { BehaviorSubject } from 'rxjs';

import { AgubeRoute } from '../../agube-route';

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
  public valuesReservoir: string[] = [];
  public selectedRowIndex = '';
  public address: string;
  public data: string;
  public datasource: BehaviorSubject<any>;
  public tableHeader: BehaviorSubject<Header[]> = new BehaviorSubject<Header[]>(
    [
      {
        columnDataName: 'id',
        columnName: 'id',
      },

      {
        columnDataName: 'street',
        columnName: 'Calle',
      },
      {
        columnDataName: 'number',
        columnName: 'Número',
      },
      {
        columnDataName: 'flat',
        columnName: 'Piso',
      },
      {
        columnDataName: 'gate',
        columnName: 'Puerta',
      },
      {
        columnDataName: 'capacity',
        columnName: 'Capacidad',
      },
      {
        columnDataName: 'inlet_flow',
        columnName: 'inlet_flow',
      },
      {
        columnDataName: 'outlet_flow',
        columnName: 'outlet_flow.',
      },
    ]
  );
  constructor(
    private readonly svcReservoirService: ReservoirService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.svcReservoirService.getReservoirs().subscribe((value) => {
      if (value.length !== 0) {
        this.valuesReservoir = Object.keys(value[0]);
        this.datasource = new BehaviorSubject<any[]>(value);
      }
    });
  }

  public selectRow(row: any): void {
    const result: any = Object.values(row).reduce(
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
