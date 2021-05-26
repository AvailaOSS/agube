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
import { DwellingDetail, DwellingService } from '@availa/agube-rest-api';
import { User } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { AgubeRoute } from '../../agube-route';
import { TableDataSourceService } from '@availa/table';

interface DwellingTableDataSource{
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
  @Output() selected = new EventEmitter<DwellingDetail>();
  public dataSource:DwellingDetail[] =[] ;
  public selectedRowIndex = '';
  public address: string;
  public currentUser: User;
  public data: string;

  constructor(
    private readonly svcCreateNewDWelling: DwellingService,
    private readonly route: Router,
    private svcTableService: TableDataSourceService
  ) {}

  public ngOnInit(): void {
    this.svcCreateNewDWelling.getDwellings().subscribe((value) => {

      this.svcTableService.addDataSource(value);
      this.svcTableService.addHeader(['id','Código Contador','Calle','Número','Piso','Puerta','Ciudad','Nombre Residente', 'Número Telf.']);

    });
  }

  public selectRow(row: DwellingDetail): void {
    this.address = `${row.flat}  -  ${row.gate} - ${row.number} - ${row.street}  -  ${row.number} - ${row.street} - ${row.town}`;

    this.selected.emit(row);
    this.selectedRowIndex = row.id;
  }

  public addNewDwelling(): void {
    this.route.navigate([AgubeRoute.CREATE_DWELLING]);
  }
}
