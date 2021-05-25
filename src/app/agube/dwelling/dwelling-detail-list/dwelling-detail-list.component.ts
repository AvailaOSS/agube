import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from 'angular-bootstrap-md';
import { DwellingDetail, DwellingService } from '@availa/agube-rest-api';
import { User } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { AgubeRoute } from '../../agube-route';
import { TableDataSourceService } from '@availa/table';

@Component({
  selector: 'app-dwelling-detail-list',
  templateUrl: './dwelling-detail-list.component.html',
  styleUrls: ['./dwelling-detail-list.component.scss'],
})
export class DwellingDetailListComponent implements OnInit {
  @Output() selected = new EventEmitter<DwellingDetail>();
  public dataSource:DwellingDetail[] =[] ;
  public selectedRowIndex = '';
  public address: string;
  public currentUser: User;
  public data: string;

  constructor(
    private readonly svcCreateNewDWelling: DwellingService,
    private readonly route: Router
  ) {}

  public ngOnInit(): void {
    this.svcCreateNewDWelling.getDwellings().subscribe((value) => {
      this.dataSource = value;

    });
  }

  public selectRow(row: DwellingDetail): void {
    this.address = `${row.flat}  -  ${row.gate} - ${row.number} - ${row.street}  -  ${row.number} - ${row.street} - ${row.town}`;

    this.selected.emit(row);
    this.selectedRowIndex = row.id;
  }

  public addNewDwelling(): void {
    this.route.navigate([AgubeRoute.CREATE_DWELLING]);
  }
}
