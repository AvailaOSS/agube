import { Component, OnInit } from '@angular/core';
import { DwellingDetail } from '@availa/agube-rest-api';
import { TableReloadService } from './table/table-reload.service';

@Component({
  selector: 'app-page-dwelling-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
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
