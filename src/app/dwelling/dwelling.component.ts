import { Component } from '@angular/core';
import { DwellingDetail } from '@availa/agube-rest-api';

@Component({
  selector: 'app-dwelling',
  templateUrl: './dwelling.component.html',
  styleUrls: ['./dwelling.component.scss'],
})
export class DwellingComponent {
  public dwellingId: number;

  constructor() {
    //
  }

  public selectItem(dwelling: DwellingDetail): void {
    this.dwellingId = +dwelling.id;
  }
}
