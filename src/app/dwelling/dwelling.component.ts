import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DwellingDetail } from '../../../apiaux/agube-rest-api-lib/src/lib/model/dwellingDetail';

@Component({
  selector: 'app-dwelling',
  templateUrl: './dwelling.component.html',
  styleUrls: ['./dwelling.component.scss'],
})
export class DWellingComponent implements OnInit {
  public DWelling: DwellingDetail;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public selectItem(DWelling: DwellingDetail): void {
    this.DWelling = DWelling;
  }

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
  public addNewWelling(): void {
    this.router.navigate(['viviendas/alta/vivienda']);
  }
}
