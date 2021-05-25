import { Component, OnInit } from '@angular/core';
import { TableDataSourceService } from '@availa/table';
import { DwellingService } from '@availa/agube-rest-api';
import { COUNTRIES } from './countries';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(
    private svcTableService: TableDataSourceService,
    private svcCreateNewDWelling: DwellingService
  ) {}

  ngOnInit() {

    this.svcTableService.addDataSource(COUNTRIES);

  }
}
