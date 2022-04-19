import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import { MapEvent } from './map-event';
import { LocationResponse } from './location-response';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { ConfigureMap } from './configure-map';

@Component({
  selector: 'app-street-view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements AfterViewInit {
  @ViewChild(MatSelectionList) public candidateComponents:
    | MatSelectionList
    | undefined;

  public zoom: number = 18;
  private zoomMax: number = 19;
  private zoomMin: number = 6;

  private map: any;

  public selectedStreetCandidate: LocationResponse | undefined;
  public streetCandidates: LocationResponse[] = [];

  // filter
  public filter: FormControl = new FormControl('', Validators.required);
  public street: FormControl = new FormControl('', Validators.required);
  public number: FormControl = new FormControl('', Validators.required);
  public flat: FormControl = new FormControl('', Validators.required);
  public gate: FormControl = new FormControl('', Validators.required);

  // You can override this url for use other maps
  private static mapViewUrl: string =
    'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
  private static mapSearchCoordinatesUrlPrefix: string = `https://nominatim.openstreetmap.org/reverse?`;
  private static mapSearchUrlPrefix: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static mapSearchUrlSufix: string = `&polygon_geojson=1&limit=7&format=jsonv2&addressdetails=1`;

  private resetMapLocation: ConfigureMap = {
    lat: 39.92666,
    lon: -2.33976,
    zoom: 6,
    showCircle: false,
  };

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initializeMap(this.resetMapLocation);
  }

  public filtering() {
    this.getLocationBySearch().subscribe((response) => {
      this.candidateComponents?.deselectAll();
      this.streetCandidates = response;
      this.selectedStreetCandidate = response[0];
      this.filter.setValue(this.selectedStreetCandidate.display_name);
      this.initializeMap({
        lat: this.selectedStreetCandidate.lat,
        lon: this.selectedStreetCandidate.lon,
        zoom: this.zoom,
        showCircle: true,
      });
    });
  }

  public clearFilter() {
    this.filter.setValue('');
    this.initializeMap(this.resetMapLocation);
  }

  public selectCandidate(candidate: LocationResponse) {
    this.selectedStreetCandidate = candidate;
    this.filter.setValue(this.selectedStreetCandidate.display_name);
    this.initializeMap({
      lat: this.selectedStreetCandidate.lat,
      lon: this.selectedStreetCandidate.lon,
      zoom: this.zoom,
      showCircle: true,
    });
  }

  private getLocationBySearch(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(
      CreateComponent.mapSearchUrlPrefix +
        this.filter.value +
        CreateComponent.mapSearchUrlSufix
    );
  }

  private getLocationByCoordinate(
    lat: number,
    lon: number
  ): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(
      CreateComponent.mapSearchCoordinatesUrlPrefix +
        `lat=${lat}&lon=${lon}` +
        CreateComponent.mapSearchUrlSufix
    );
  }

  private initializeMap(conf: ConfigureMap): void {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('map', {
      center: [conf.lat, conf.lon],
      doubleClickZoom: false,
      zoom: conf.zoom,
    });

    const tiles = L.tileLayer(CreateComponent.mapViewUrl, {
      maxZoom: this.zoomMax,
      minZoom: this.zoomMin,
    });

    tiles.addTo(this.map);

    let circle: L.Circle | undefined = undefined;
    if (conf.showCircle) {
      circle = L.circle([conf.lat, conf.lon], {
        fillColor: '#7fd3f7',
        fillOpacity: 0.5,
        radius: 10,
      }).addTo(this.map);
    }

    this.map.on('click', (e: MapEvent) => {
      if (e.sourceTarget._animateToZoom) {
        this.zoom = e.sourceTarget._animateToZoom;
      }

      conf.lat = e.latlng.lat;
      conf.lon = e.latlng.lng;

      if (circle) {
        this.map.removeLayer(circle);
      }
      this.initializeMap(conf);

      this.getLocationByCoordinate(conf.lat, conf.lon).subscribe(
        (response: LocationResponse) => {
          this.selectedStreetCandidate = response;
          this.filter.setValue(this.selectedStreetCandidate.display_name);
        }
      );
    });
  }
}
