import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Reservoir {
  // TODO: use apiaux/reservoir...
  id: string;
  address: string;
  water_meter: string;
  resident_name: string;
  phone: string;
}

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.component.html',
  styleUrls: ['./reservoir.component.scss'],
})
export class ReservoirComponent implements OnInit {
  public reservoir: Reservoir;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public selectItem(reservoir: Reservoir): void {
    this.reservoir = reservoir;
  }

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }

  public addNewReservoir(): void {
    this.router.navigate(['depositos/alta/deposito']);
  }
}
