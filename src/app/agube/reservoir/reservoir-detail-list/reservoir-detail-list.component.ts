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
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from 'angular-bootstrap-md';
import { AgubeRoute } from '../../agube-route';

@Component({
  selector: 'app-reservoir-detail-list',
  templateUrl: './reservoir-detail-list.component.html',
  styleUrls: ['./reservoir-detail-list.component.scss'],
})
export class ReservoirDetailListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  @Output() selected = new EventEmitter<ReservoirDetail>();

  public address: string;
  public selectedRowIndex = '';
  public data: string;
  elements: any = [];
  previous: any = [];
  public dataSource: ReservoirDetail[];
  headElementsRead = ['Dirección', 'inlet_flow', 'outlet_flow'];
  headElements = ['Dirección', 'Contador', 'Capacidad'];

  constructor(
    private readonly svcReservoirService: ReservoirService,
    private readonly router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.svcReservoirService.getReservoirs().subscribe((value) => {
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

  public selectRow(row: any): void {
    this.address = `${row.flat}  -  ${row.gate} - ${row.number} - ${row.street}  -  ${row.number} - ${row.street} - ${row.town}`;
    this.selected.emit(row);
    this.selectedRowIndex = row.id;
  }

  public addNewReservoir(): void {
    this.router.navigate([AgubeRoute.CREATE_RESERVOIR]);
  }
}
