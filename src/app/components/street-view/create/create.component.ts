import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FullAddress } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import { MapEvent } from './map-event';
import { LocationResponse } from './location-response';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-street-view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements AfterViewInit {
  @Input() public id: number | undefined;
  @Input() public address: FullAddress | undefined;

  @ViewChild(MatSelectionList) public candidateComponents:
    | MatSelectionList
    | undefined;

  public zoom: number = 18;
  private zoomMax: number = 19;
  private zoomMin: number = 13;

  private map: any;

  public selectedStreetCandidate: LocationResponse | undefined;
  public streetCandidates: LocationResponse[] = [];

  // filter
  public filter: FormControl = new FormControl('', Validators.required);

  // You can override this url for use other maps
  private static mapViewUrl: string =
    'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
  private static mapSearchCoordinatesUrlPrefix: string = `https://nominatim.openstreetmap.org/reverse?`;
  private static mapSearchUrlPrefix: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static mapSearchUrlSufix: string = `&polygon_geojson=1&limit=7&format=jsonv2&addressdetails=1`;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.getLocation(this.address!).subscribe(
      (response: LocationResponse[]) => {
        this.streetCandidates = response;
        this.selectedStreetCandidate = response[0];
        if (!this.selectedStreetCandidate) {
          return;
        }
        this.initializeMap(
          this.selectedStreetCandidate.lat,
          this.selectedStreetCandidate.lon
        );
      }
    );
  }

  public filtering() {
    this.getLocationBySearch().subscribe((response) => {
      this.candidateComponents?.deselectAll();
      this.streetCandidates = response;
      this.selectedStreetCandidate = response[0];
      this.filter.setValue(this.selectedStreetCandidate.display_name);
      this.initializeMap(
        this.selectedStreetCandidate.lat,
        this.selectedStreetCandidate.lon
      );
    });
  }

  public clearFilter() {
    this.filter.setValue('');
  }

  public selectCandidate(candidate: LocationResponse) {
    this.selectedStreetCandidate = candidate;
    this.filter.setValue(this.selectedStreetCandidate.display_name);
    this.initializeMap(
      this.selectedStreetCandidate.lat,
      this.selectedStreetCandidate.lon
    );
  }

  private getLocationBySearch(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(
      CreateComponent.mapSearchUrlPrefix +
        this.filter.value +
        CreateComponent.mapSearchUrlSufix
    );
  }

  private getLocation(address: FullAddress): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(
      CreateComponent.mapSearchUrlPrefix +
        address.address.town +
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

  private initializeMap(lat: number, lon: number): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map', {
      center: [lat, lon],
      zoom: this.zoom,
    });

    const tiles = L.tileLayer(CreateComponent.mapViewUrl, {
      maxZoom: this.zoomMax,
      minZoom: this.zoomMin,
    });

    tiles.addTo(this.map);

    L.circle([lat, lon], {
      fillColor: '#7fd3f7',
      fillOpacity: 0.5,
      radius: 10,
    }).addTo(this.map);

    this.map.on('click', (e: MapEvent) => {
      if (e.sourceTarget._animateToZoom) {
        this.zoom = e.sourceTarget._animateToZoom;
      }

      let lat = e.latlng.lat;
      let lng = e.latlng.lng;
      this.initializeMap(lat, lng);

      this.getLocationByCoordinate(lat, lng).subscribe(
        (response: LocationResponse) => {
          this.selectedStreetCandidate = response;
          this.filter.setValue(this.selectedStreetCandidate.display_name);
        }
      );
    });
  }
}
