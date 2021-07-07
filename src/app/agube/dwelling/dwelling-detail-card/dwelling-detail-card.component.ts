import { Component, OnInit, Input } from '@angular/core';
import { WaterMeterEnabledDetailCardComponent } from './water-meter-enabled-detail-card/water-meter-enabled-detail-card.component';
import { DwellingCreate, DwellingService } from '@availa/agube-rest-api';

@Component({
  selector: 'app-dwelling-detail-card',
  templateUrl: './dwelling-detail-card.component.html',
  styleUrls: ['./dwelling-detail-card.component.scss'],
})
export class DwellingDetailCardComponent implements OnInit {
  @Input() public dwellingId: number;
  public dwelling: DwellingCreate | undefined;

  public sendWaterMeterCode: WaterMeterEnabledDetailCardComponent;

  constructor(private readonly svcDwelling: DwellingService) {
    //
  }

  ngOnInit(): void {
    this.svcDwelling.getDwelling(this.dwellingId).subscribe(result => this.dwelling = result);
  }

  public sendWater(event: any): void {
    this.sendWaterMeterCode = event;
  }
}
