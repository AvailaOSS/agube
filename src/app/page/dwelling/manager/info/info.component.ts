import { Component, OnInit } from '@angular/core';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  public map: ConfigureMap | undefined;

  constructor() {}

  ngOnInit(): void {
    this.configureMap();
  }

  private configureMap() {
    this.map = {
      lat: '42.095738600000000',
      lon: '-8.845103700000000',
      zoom: 15,
      showCircle: false,
      height: '500px',
      dragging: true,
    };
  }
}
