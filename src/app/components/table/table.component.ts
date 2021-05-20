import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DwellingService } from '@availa/agube-rest-api';
import { OnChanges } from '@angular/core';
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from 'angular-bootstrap-md';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @Output() selected = new EventEmitter<any>();
  @Input() public headElementsRead: [] = [];
  @Input() public headElements: [] = [];
  @Input() public dataSource: [] = [];

  public elements: any = [];
  public previous: any = [];

  public selectedRowIndex = '';
  public address: string;
  public currentUser: any;
  public data: string;
  constructor(private cdRef: ChangeDetectorRef) {}

  public ngOnChanges(): void {
    this.mdbTable.setDataSource(this.dataSource);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
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
}
