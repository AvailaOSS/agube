import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DwellingDetail } from '@availa/agube-rest-api';
import { AgubeRoute } from '../agube-route';

@Component({
  selector: 'app-dwelling',
  templateUrl: './dwelling.component.html',
  styleUrls: ['./dwelling.component.scss'],
})
export class DwellingComponent {
  public dwelling: DwellingDetail;

  constructor(private readonly router: Router) {

  }

  public selectItem(dwelling: DwellingDetail): void {
    this.dwelling = dwelling;
  }
  public selectHeader(headers: string[]): void{
    console.log(this.dwelling.gate);


  }
}
