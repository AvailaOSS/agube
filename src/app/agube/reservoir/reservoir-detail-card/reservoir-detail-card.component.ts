import { Component, Input, OnInit } from '@angular/core';
import { ReservoirDetail, ReservoirService } from '@availa/agube-rest-api';

@Component({
  selector: 'app-reservoir-detail-card',
  templateUrl: './reservoir-detail-card.component.html',
})
export class ReservoirDetailCardComponent implements OnInit {
  @Input() reservoir: ReservoirDetail | undefined;

  constructor(private readonly svcReservoirService: ReservoirService) {}

  public ngOnInit(): void {}
}
