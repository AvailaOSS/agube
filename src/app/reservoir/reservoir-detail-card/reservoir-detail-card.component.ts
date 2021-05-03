import { Component, Input, OnInit } from '@angular/core';
import { ReservoirService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { Reservoir } from '../reservoir.component';

@Component({
  selector: 'app-reservoir-detail-card',
  templateUrl: './reservoir-detail-card.component.html',
})
export class ReservoirDetailCardComponent implements OnInit {
  @Input() reservoir: Reservoir | undefined;

  constructor(private readonly svcReservoirService: ReservoirService) {}

  public ngOnInit(): void {}
}
