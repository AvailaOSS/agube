import { Component, Input, OnInit } from '@angular/core';
import { ReservoirService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { ReservoirDetail } from 'apiaux/agube-rest-api-lib/src/lib/model/reservoirDetail';

@Component({
  selector: 'app-reservoir-detail-card',
  templateUrl: './reservoir-detail-card.component.html',
})
export class ReservoirDetailCardComponent implements OnInit {
  @Input() reservoir: ReservoirDetail | undefined;

  constructor(private readonly svcReservoirService: ReservoirService) {}

  public ngOnInit(): void {}
}
