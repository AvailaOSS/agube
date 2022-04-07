import { Component, OnInit } from '@angular/core';
import { DwellingCreate, DwellingDetail } from '@availa/agube-rest-api';
import { TableReloadService } from './table/table-reload.service';

@Component({
  selector: 'app-manager-dwelling',
  templateUrl: './manager-dwelling.component.html',
  styleUrls: ['./manager-dwelling.component.scss'],
})
export class ManagerDwellingComponent implements OnInit {
  public element: DwellingDetail | undefined;

  constructor(private svcTableReload: TableReloadService) {}

  ngOnInit(): void {}

  public readSelected(element: DwellingDetail | undefined) {
    if (!element) {
      return;
    }
    this.element = element;
  }

  public waterMeterChanged(change: boolean) {
    this.svcTableReload.emitReload(change);
  }
}
