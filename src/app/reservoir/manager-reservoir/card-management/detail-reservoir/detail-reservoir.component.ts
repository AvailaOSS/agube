import { Component, Input, OnChanges } from '@angular/core';
import { ReservoirService, ReservoirCreate } from '@availa/agube-rest-api';

@Component({
  selector: 'app-detail-reservoir',
  templateUrl: './detail-reservoir.component.html',
  styleUrls: ['./detail-reservoir.component.scss'],
})
export class DetailReservoirComponent implements OnChanges {
  @Input() public reservoirId: number | undefined;
  public reservoir: ReservoirCreate | undefined = undefined;

  constructor(private svcReservoir: ReservoirService) { }
  ngOnChanges(): void {
    if (!this.reservoirId) {
      return
    }

    this.svcReservoir.getReservoir(this.reservoirId).subscribe({
      next: (response) => {
        this.reservoir = response
      },
      error: () => {
        this.reservoir = undefined
      }
    });
  }



}
