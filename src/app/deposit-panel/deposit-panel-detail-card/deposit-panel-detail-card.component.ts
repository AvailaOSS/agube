import { ReservoirService } from './../../../../apiaux/agube-rest-api-lib/src/lib/service/reservoir.service';
import { Component, Input, OnInit } from '@angular/core';
import { DepositPanel } from '../deposit-panel.component';

@Component({
  selector: 'app-deposit-panel-detail-card',
  templateUrl: './deposit-panel-detail-card.component.html',
  styleUrls: ['./deposit-panel-detail-card.component.scss'],
})
export class DepositPanelDetailCardComponent implements OnInit {
  @Input() DepositPanel: DepositPanel | undefined;

  constructor(private readonly svcReservoirService: ReservoirService) {}

  public ngOnInit(): void {


  }
}
