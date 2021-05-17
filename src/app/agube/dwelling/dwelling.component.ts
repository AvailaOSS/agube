import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DwellingDetail } from '@availa/agube-rest-api';
import { AgubeRoute } from '../agube-route';

@Component({
  selector: 'app-dwelling',
  templateUrl: './dwelling.component.html',
  styleUrls: ['./dwelling.component.scss'],
})
export class DwellingComponent implements OnInit {
  public dwelling: DwellingDetail;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public selectItem(dwelling: DwellingDetail): void {
    this.dwelling = dwelling;
  }

  public goToControlPanel(): void {
    this.router.navigate([AgubeRoute.CONTROL_PANEL]);
  }
}
