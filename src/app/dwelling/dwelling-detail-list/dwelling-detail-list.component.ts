import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  DwellingDetail,
  DwellingService,
} from 'apiaux/agube-rest-api-lib/src/public-api';
import { User } from 'apiaux/subscription-rest-api-lib/src/public-api';

@Component({
  selector: 'app-dwelling-detail-list',
  templateUrl: './dwelling-detail-list.component.html',
  styleUrls: ['./dwelling-detail-list.component.scss'],
})
export class DWellingDetailListComponent implements OnInit {
  @Output() selected = new EventEmitter<DwellingDetail>();
  public selectedRowIndex = '';
  public address: string;
  public dataSource: DwellingDetail[];
  public currentUser: User;

  constructor(private readonly svcCreateNewDWelling: DwellingService) {}

  ngOnInit(): void {
    this.svcCreateNewDWelling.getDwellings().subscribe((value) => {
      this.dataSource = value;
    });
  }

  public selectRow(row: DwellingDetail): void {
    this.address = `${row.flat}  -  ${row.gate} - ${row.number} - ${row.street}  -  ${row.number} - ${row.street} - ${row.town}`;

    this.selected.emit(row);
    this.selectedRowIndex = row.id;
  }
}
