import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReservoirDetail,
  ReservoirService,
} from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-reservoir-detail-list',
  templateUrl: './reservoir-detail-list.component.html',
  styleUrls: ['./reservoir-detail-list.component.scss'],
})
export class ReservoirDetailListComponent implements OnInit {
  @Output() selected = new EventEmitter<any>();
  public address: string;
  public selectedRowIndex = '';

  public dataSource: ReservoirDetail[];

  constructor(private readonly svcReservoirService: ReservoirService) {}

  ngOnInit(): void {
    this.svcReservoirService.getReservoirs().subscribe((value) => {
      this.dataSource = value;
    });
  }

  public selectRow(row: any): void {
    this.address = `${row.flat}  -  ${row.gate} - ${row.number} - ${row.street}  -  ${row.number} - ${row.street} - ${row.town}`;
    this.selected.emit(row);
    this.selectedRowIndex = row.id;
  }
}
