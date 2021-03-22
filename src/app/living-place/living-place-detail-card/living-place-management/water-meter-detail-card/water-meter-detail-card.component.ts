import { Component, OnInit } from '@angular/core';
import { WaterMeterDetailCard } from './water-meter-detail-card';
import { WaterMeterService } from '../../../../../../apiaux/agube-rest-api-lib/src/lib/service/waterMeter.service';

@Component({
  selector: 'app-water-meter-detail-card',
  templateUrl: './water-meter-detail-card.component.html',
  styleUrls: ['./water-meter-detail-card.component.scss'],
})
export class WaterMeterDetailCardComponent implements OnInit {
  public currentWaterMeter: WaterMeterDetailCard;

  constructor(private readonly svcCountService: WaterMeterService) {}

  ngOnInit(): void {
    
    this.currentWaterMeter = {
      code: '00000001AS',
      activation_date: new Date('2011-04-17'),
    };
  }
}
