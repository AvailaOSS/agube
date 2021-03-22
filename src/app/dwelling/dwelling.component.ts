import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface DWelling {
  id: string;
  address: string;
  water_meter: string;
  resident_name: string;
  phone: string;
}

@Component({
  selector: 'app-dwelling',
  templateUrl: './dwelling.component.html',
  styleUrls: ['./dwelling.component.scss'],
})
export class DWellingComponent implements OnInit {
  public DWelling: DWelling;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public selectItem(DWelling: DWelling): void {
    this.DWelling = DWelling;
  }

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
}
