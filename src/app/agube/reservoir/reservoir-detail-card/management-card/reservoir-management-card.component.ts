import { Component, Input, OnInit } from '@angular/core';
import { ReservoirCreate } from '@availa/agube-rest-api';

@Component({
  selector: 'app-reservoir-management-card',
  templateUrl: './reservoir-management-card.component.html',
})
export class ReservoirManagementComponent implements OnInit {
  @Input() reservoir: ReservoirCreate;

  constructor() {
    //
  }

  public ngOnInit(): void {
    //
  }
}
