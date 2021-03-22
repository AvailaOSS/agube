import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DepositPanel } from '../deposit-panel.component';

@Component({
  selector: 'app-deposit-panel-detail-list',
  templateUrl: './deposit-panel-detail-list.component.html',
  styleUrls: ['./deposit-panel-detail-list.component.scss']
})
export class DepositPanelDetailListComponent implements OnInit {
  @Output() selected = new EventEmitter<DepositPanel>();

  public selectedRowIndex = '';

  public displayedColumns: string[] = [
    'address',
    'water_meter',
    'resident_name',
    'phone',
  ];
  public dataSource: DepositPanel[];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = [
      {
        id: '1',
        address: 'Invernalia, 5º 1A',
        water_meter: '0000001',
        resident_name: 'John Snow',
        phone: '666666666',
      },
      {
        id: '2',
        address: 'Invernalia, 1º 1C',
        water_meter: '0000002',
        resident_name: 'Eddard Stark',
        phone: '666666666',
      },
      {
        id: '3',
        address: 'Roca Dragón, 1 bajo',
        water_meter: '0000003',
        resident_name: 'Daenerys Targaryen',
        phone: '666666666',
      },
      {
        id: '4',
        address: 'Pentos, 99',
        water_meter: '0000004',
        resident_name: 'Khal Drogo',
        phone: '666666666',
      },
      {
        id: '5',
        address: 'Desembarco del Rey, 1',
        water_meter: '0000005',
        resident_name: 'Robert Baratheon',
        phone: '666666666',
      },
    ];
  }

  public selectRow(row: DepositPanel) {
    this.selected.emit(row);
    this.selectedRowIndex = row.address;
  }
}
