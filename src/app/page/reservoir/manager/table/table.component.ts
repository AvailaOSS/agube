import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReservoirDetail, ReservoirService } from '@availa/agube-rest-api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public displayedColumns: string[] = [
    'capacity',
    'inlet_flow',
    'outlet_flow',
    'full_address',
  ];
  dataSource: MatTableDataSource<ReservoirDetail> = new MatTableDataSource();
  public isSelected: ReservoirDetail | undefined = undefined;
  @Output() public selectedElement: EventEmitter<
    ReservoirDetail | undefined
  > = new EventEmitter<ReservoirDetail | undefined>();

  public filter = new FormControl('');

  constructor(private router: Router, private svcReservoir: ReservoirService) {}

  ngOnInit(): void {
    //FIXME: set pagination into table
    this.loadReservoirs();
  }

  public goToNewReservoir() {
    this.router.navigate(['manager/reservoirs/create']);
  }

  public applyFilter() {
    this.dataSource.filter = this.filter.value.trim().toLowerCase();
  }

  public clearFilter() {
    this.filter.setValue('');
    this.dataSource.filter = '';
  }

  public selectElement(element: ReservoirDetail) {
    this.isSelected = element;
    this.selectedElement.next(element);
  }

  private loadReservoirs() {
    this.svcReservoir.getReservoirs().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
}
