import { Component, Input, OnInit } from '@angular/core';
import { LivingPlace } from '../living-place.component';

@Component({
  selector: 'app-living-place-detail-card',
  templateUrl: './living-place-detail-card.component.html',
  styleUrls: ['./living-place-detail-card.component.scss'],
})
export class LivingPlaceDetailCardComponent implements OnInit {
  @Input() livingPlace: LivingPlace | undefined;

  constructor() {}

  ngOnInit(): void {}
}
