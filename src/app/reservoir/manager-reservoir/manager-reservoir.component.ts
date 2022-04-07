import { Component, OnInit } from '@angular/core';
import { ReservoirDetail } from '@availa/agube-rest-api';

@Component({
  selector: 'app-manager-reservoir',
  templateUrl: './manager-reservoir.component.html',
  styleUrls: ['./manager-reservoir.component.scss'],
})
export class ManagerReservoirComponent implements OnInit {
  public element: ReservoirDetail | undefined;

  constructor() {}

  ngOnInit(): void {}
  readSelected(element: ReservoirDetail | undefined) {
    if (!element) {
      return;
    }
    this.element = element;
  }
}
