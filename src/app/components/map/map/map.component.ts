import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LocationResponse } from './location-response';
import { ConfigureMap } from './configure-map';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() public configureMap: ConfigureMap | undefined;

  public selectedStreetCandidate: LocationResponse | undefined;

  protected map: any;

  public static zoom: number = 18;
  public static zoomMax: number = 19;
  public static zoomMin: number = 4;

  protected static mapViewUrl: string =
    'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.configureMap) {
      throw new Error('Configure Map before call');
    }
    this.initializeMap(this.configureMap);
  }

  protected initializeMap(conf: ConfigureMap): void {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('map', {
      center: [+conf.lat, +conf.lon],
      doubleClickZoom: false,
      zoom: conf.zoom,
      dragging: false,
      scrollWheelZoom: undefined,
    });

    const tiles = L.tileLayer(MapComponent.mapViewUrl, {
      maxZoom: MapComponent.zoomMax,
      minZoom: MapComponent.zoomMin,
    });

    tiles.addTo(this.map);

    let circle: L.Circle | undefined = undefined;
    if (conf.showCircle) {
      circle = L.circle([+conf.lat, +conf.lon], {
        fillColor: '#7fd3f7',
        fillOpacity: 0.5,
        radius: 10,
      }).addTo(this.map);
    }
  }
}
