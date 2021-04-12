import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DepositPanel } from '../deposit-panel.component';
import { ReservoirService } from '../../../../apiaux/agube-rest-api-lib/src/lib/service/reservoir.service';
import { ReservoirDetail } from '../../../../apiaux/agube-rest-api-lib/src/lib/model/reservoirDetail';

@Component({
  selector: 'app-deposit-panel-detail-list',
  templateUrl: './deposit-panel-detail-list.component.html',
  styleUrls: ['./deposit-panel-detail-list.component.scss'],
})
export class DepositPanelDetailListComponent implements OnInit {
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
