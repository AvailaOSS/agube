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

<<<<<<< HEAD
  constructor(private readonly svcCountService: WaterMeterService) {}

  ngOnInit(): void {
    
=======
  public ngOnChanges(): void {
    this.svcWelling
      .getCurrentWaterMeter(this.DWelling.id)
      .subscribe((value) => {
        this.currentWaterMeter = {
          code: value.code,
          activation_date: value.releaseDate.split('T')[0],
        };
        this.sendWaterMeter.emit(this.currentWaterMeter)
      });
  }
  public ngOnInit(): void {
>>>>>>> dedf782... fix: update new apis
    this.currentWaterMeter = {
      code: '00000001AS',
      activation_date: new Date('2011-04-17'),
    };
  }
}
