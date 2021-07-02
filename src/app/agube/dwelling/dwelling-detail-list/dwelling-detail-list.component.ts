import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DwellingDetail, DwellingService } from '@availa/agube-rest-api';
import { AgubeRoute } from '../../agube-route';
import { BehaviorSubject } from 'rxjs';
import { Header } from '@availa/table/lib/header';
import { isNull } from 'lodash';

interface DwellingTableDataSource {
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
  selector: 'app-dwelling-detail-list',
  templateUrl: './dwelling-detail-list.component.html',
  styleUrls: ['./dwelling-detail-list.component.scss'],
})
export class DwellingDetailListComponent implements OnInit {
  @Output() sendSelected: EventEmitter<DwellingDetail> =
    new EventEmitter<DwellingDetail>();
  public keysDwelling: string[] = [];
  public valuesDwelling: any[] = [];
  public selectedRowIndex = '';
  public address: string;
  public data: string;
  public tableHeader: BehaviorSubject<Header[]> = new BehaviorSubject<Header[]>(
    [
      {
        columnDataName: 'water_meter_code',
        columnName: 'Código Contador',
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
        columnDataName: 'town',
        columnName: 'Ciudad',
      },
      {
        columnDataName: 'resident_first_name',
        columnName: 'Nombre Residente',
      },
      {
        columnDataName: 'resident_phone',
        columnName: 'Número Telf.',
      },
    ]
  );

  public datasource: BehaviorSubject<any>;

  constructor(
    private readonly svcCreateNewDWelling: DwellingService,
    private readonly route: Router
  ) {}

  public ngOnInit(): void {
    this.svcCreateNewDWelling.getDwellings().subscribe((value) => {
      if (value.length !== 0) {
        this.datasource = new BehaviorSubject<any[]>(value);
        this.keysDwelling = Object.keys(value[0]);
        this.valuesDwelling = Object.values(value);
      }
    });
  }

  public selectRow(row: any): void {
    console.log(this.valuesDwelling);
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
