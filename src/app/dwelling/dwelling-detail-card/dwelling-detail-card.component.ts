import { Component, Input, OnInit } from '@angular/core';
import { DWelling } from '../dwelling.component';

@Component({
  selector: 'app-dwelling-detail-card',
  templateUrl: './dwelling-detail-card.component.html',
  styleUrls: ['./dwelling-detail-card.component.scss'],
})
export class DWellingDetailCardComponent implements OnInit {
  @Input() DWelling: DWelling | undefined;

  constructor() {}

  ngOnInit(): void {}
}
