import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservoirDetail } from 'apiaux/agube-rest-api-lib/src/lib/model/reservoirDetail';
import { AgubeRoute } from '../agube-route';

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.scss'],
})
export class ReservoirComponent implements OnInit {
  public reservoir: ReservoirDetail;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public selectItem(reservoir: ReservoirDetail): void {
    this.reservoir = reservoir;
  }

  public goToControlPanel(): void {
    this.router.navigate([AgubeRoute.CONTROL_PANEL]);
  }
}
