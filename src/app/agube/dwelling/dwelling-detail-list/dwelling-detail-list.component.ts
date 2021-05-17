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
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from 'angular-bootstrap-md';
import { DwellingDetail, DwellingService } from '@availa/agube-rest-api';
import { User } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { AgubeRoute } from '../../agube-route';

@Component({
  selector: 'app-dwelling-detail-list',
  templateUrl: './dwelling-detail-list.component.html',
  styleUrls: ['./dwelling-detail-list.component.scss'],
})
export class DwellingDetailListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @Output() selected = new EventEmitter<DwellingDetail>();

  public elements: any = [];
  public previous: any = [];
  public headElementsRead = [
    'Dirección',
    'water_meter_code',
    'resident_first_name',
    'resident_phone',
  ];
  public headElements = ['Dirección', 'Contador', 'Residente', 'Teléfono'];

  public selectedRowIndex = '';
  public address: string;
  public dataSource: DwellingDetail[] = [];
  public currentUser: User;
  public data: string;

  constructor(
    private readonly svcCreateNewDWelling: DwellingService,
    private readonly route: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.svcCreateNewDWelling.getDwellings().subscribe((value) => {
      this.dataSource = value;
      this.mdbTable.setDataSource(this.dataSource);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  public ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
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
