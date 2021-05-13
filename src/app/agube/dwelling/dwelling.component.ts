import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DwellingDetail } from 'apiaux/agube-rest-api-lib/src/public-api';

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
    this.router.navigate(['/control-panel']);
  }

}
