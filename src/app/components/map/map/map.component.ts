import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LocationResponse } from '../create/location-response';
import { ConfigureMap } from './configure-map';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements  AfterViewInit {
  @Input() public mapHeight? = '500px';
  @Input() public configureMap: ConfigureMap | undefined;

  public selectedStreetCandidate: LocationResponse | undefined;

  private myMap: any;

  private static zoom: number = 18;
  private static zoomMax: number = 19;
  private static zoomMin: number = 4;

  private static mapViewUrl: string =
    'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';

  constructor() {}


  ngAfterViewInit(): void {
    if (!this.configureMap) {
      throw new Error('Configure Map before call');
    }
    this.initializeMap(this.configureMap);
  }

  private initializeMap(conf: ConfigureMap): void {
    if (this.myMap) {
      this.myMap.remove();
    }
    this.myMap = L.map('myMap', {
      center: [conf.lat, conf.lon],
      doubleClickZoom: false,
      zoom: conf.zoom,
      dragging: false,
    });

    const tiles = L.tileLayer(MapComponent.mapViewUrl, {
      maxZoom: MapComponent.zoomMax,
      minZoom: MapComponent.zoomMin,
    });

    tiles.addTo(this.myMap);

    let circle: L.Circle | undefined = undefined;
    if (conf.showCircle) {
      circle = L.circle([conf.lat, conf.lon], {
        fillColor: '#7fd3f7',
        fillOpacity: 0.5,
        radius: 10,
      }).addTo(this.myMap);
    }
  }
}
