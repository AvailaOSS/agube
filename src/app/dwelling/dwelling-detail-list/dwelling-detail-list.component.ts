import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DwellingDetail, DwellingService } from '@availa/agube-rest-api';
import { Header } from '@availa/table/lib/header';

import { BehaviorSubject } from 'rxjs';
import { AgubeRoute } from '../../agube-route';

@Component({
  selector: 'app-dwelling-detail-list',
  templateUrl: './dwelling-detail-list.component.html',
  styleUrls: ['./dwelling-detail-list.component.scss'],
})
export class DwellingDetailListComponent implements OnInit {
  @Output() sendSelected: EventEmitter<DwellingDetail> =
    new EventEmitter<DwellingDetail>();
  public keysDwelling: string[] = [];
  public tableHeader: BehaviorSubject<Header[]>;
  public datasource: BehaviorSubject<any>;

  constructor(
    private readonly svcDwelling: DwellingService,
    private readonly route: Router
  ) {
    this.tableHeader = new BehaviorSubject<Header[]>([
      {
        columnDataName: 'water_meter_code',
        columnName: 'Código Contador',
      },
      {
        columnDataName: 'town',
        columnName: 'Ciudad',
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
        columnDataName: 'resident_first_name',
        columnName: 'Nombre Residente',
      },
      {
        columnDataName: 'resident_phone',
        columnName: 'Número Telf.',
      },
    ]);
  }

  public ngOnInit(): void {
    this.svcDwelling.getDwellings().subscribe((value) => {
      if (value.length !== 0) {
        this.datasource = new BehaviorSubject<any[]>(value);
        this.keysDwelling = Object.keys(value[0]);
      }
    });
  }

  public selectRow(row: any): void {
    const result: any = Object.values(row).reduce(
      (result: any, field: any, index: any) => {
        result[this.keysDwelling[index]] = field;
        return result;
      },
      {}
    );
    this.sendSelected.emit(result);
  }

  public addNewDwelling(): void {
    this.route.navigate([AgubeRoute.CREATE_DWELLING]);
  }
}
