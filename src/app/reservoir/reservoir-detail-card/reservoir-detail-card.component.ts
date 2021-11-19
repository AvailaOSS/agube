import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ReservoirCreate, ReservoirService } from '@availa/agube-rest-api';
import { WaterMeterType } from '../../water-meter/water-meter-type.enum';

@Component({
  selector: 'app-reservoir-detail-card',
  templateUrl: './reservoir-detail-card.component.html',
  styleUrls: ['./reservoir-detail-card.component.scss'],
})
export class ReservoirDetailCardComponent implements OnInit, OnChanges {
  @Input() public reservoirId: number;
  public parentType: WaterMeterType;
  public reservoir: ReservoirCreate | undefined;

  constructor(private readonly svcReservoirService: ReservoirService) {
    this.parentType = WaterMeterType.RESERVOIR;
  }

  ngOnInit(): void {
    this.svcReservoirService
      .getReservoir(this.reservoirId)
      .subscribe((result) => (this.reservoir = result));
  }

  public ngOnChanges(): void {
    this.ngOnInit();
  }
}
