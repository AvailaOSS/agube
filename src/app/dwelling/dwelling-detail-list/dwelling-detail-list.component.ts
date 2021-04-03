import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { User } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { AccountService } from 'src/app/login/service/account.service';

import { DwellingDetail } from '../../../../apiaux/agube-rest-api-lib/src/lib/model/dwellingDetail';
import { ManagerService } from '../../../../apiaux/agube-rest-api-lib/src/lib/service/manager.service';
import jwt_decode from 'jwt-decode';

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

  constructor(

    private readonly svcCreateNewDWelling: DwellingService
  ) {}



  ngOnInit(): void {
    this.svcCreateNewDWelling.getDwellings().subscribe((value) => {
      this.dataSource = value;
    });
  }

  public selectRow(row: DwellingDetail): void {
    this.address = `${row.flat}  -  ${row.gate} - ${row.number} - ${row.street}  -  ${row.number} - ${row.street} - ${row.town}`;

    this.selected.emit(row);
    console.log(row.id)
    this.selectedRowIndex = row.id;
  }
}
