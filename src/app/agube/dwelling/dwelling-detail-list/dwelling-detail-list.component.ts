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
  public valuesDwelling: string[] = [];
  public selectedRowIndex = '';
  public address: string;
  public data: string;
  public tableHeader: string[] = [
    'id',
    'Código Contador',
    'Calle',
    'Número',
    'Piso',
    'Puerta',
    'Ciudad',
    'Nombre Residente',
    'Número Telf.',
  ];
  public datasource: BehaviorSubject<any>;
  public headDatasource: BehaviorSubject<any> = new BehaviorSubject<any[]>(
    this.tableHeader
  );
  constructor(
    private readonly svcCreateNewDWelling: DwellingService,
    private readonly route: Router
  ) {}

  public ngOnInit(): void {
    this.svcCreateNewDWelling.getDwellings().subscribe((value) => {
      this.valuesDwelling = Object.keys(value[0]);
      this.datasource = new BehaviorSubject<any[]>(value);
    });
  }

  public selectRow(row: any): void {
    const result: any = Object.values(row).reduce(
      (result: any, field: any, index: any) => {
        result[this.valuesDwelling[index]] = field;
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
