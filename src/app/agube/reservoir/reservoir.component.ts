import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservoirDetail } from '@availa/agube-rest-api';
import { AgubeRoute } from '../agube-route';

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.scss'],
})
export class ReservoirComponent implements OnInit {
  public reservoirId: number;
  constructor() {}

  ngOnInit(): void {}

  public selectItem(reservoir: ReservoirDetail): void {
    this.reservoirId = +reservoir.id;
  }
}
