import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DwellingDetail, DwellingService } from '@availa/agube-rest-api';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TableReloadService } from './table-reload.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public displayedColumns: string[] = [
    'water_meter_code',
    'full_address',
    'resident_first_name',
    'resident_phone',
  ];
  public dataSource: MatTableDataSource<
    DwellingDetail
  > = new MatTableDataSource();

  public isSelected: DwellingDetail | undefined = undefined;

  @Output() public selectedElement: EventEmitter<
    DwellingDetail | undefined
  > = new EventEmitter<DwellingDetail | undefined>();

  public filter = new FormControl('');

  constructor(
    private router: Router,
    private svcDwelling: DwellingService,
    private svcTableReload: TableReloadService
  ) {}

  ngOnInit(): void {
    //FIXME: set pagination into table
    this.loadDwellings();
    this.svcTableReload.reload().subscribe((reload) => {
      if (reload) {
        this.loadDwellings();
      }
    });
  }

  public goToNewDwelling() {
    this.router.navigate(['manager/dwellings/create']);
  }

  public applyFilter() {
    this.dataSource.filter = this.filter.value.trim().toLowerCase();
  }

  public clearFilter() {
    this.filter.setValue('');
    this.dataSource.filter = '';
  }

  public selectElement(element: DwellingDetail) {
    this.isSelected = element;
    this.selectedElement.next(element);
  }

  private loadDwellings() {
    this.svcDwelling.getDwellings().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
}
