import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input } from '@angular/core';
import { FullAddress } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import { FullAddressPipe } from 'src/app/pipes/full-address.pipe';
import * as L from 'leaflet';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MapEvent } from './map-event';
import { LocationResponse } from './location-response';

@Component({
  selector: 'app-street-view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements AfterViewInit {
  @Input() public id: number | undefined;
  @Input() public address: FullAddress | undefined;

  public zoom: number = 18;
  private zoomMax: number = 19;
  private zoomMin: number = 13;

  private map: any;

  public selectedStreetCandidate: LocationResponse | undefined;
  public streetCandidates: LocationResponse[] = [];

  // You can override this url for use other maps
  private static mapViewUrl: string =
    'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
  private static mapSearchCoordinatesUrlPrefix: string = `https://nominatim.openstreetmap.org/reverse?`;
  private static mapSearchUrlPrefix: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static mapSearchUrlSufix: string = `&polygon_geojson=1&limit=7&format=jsonv2&addressdetails=1`;

  constructor(
    private http: HttpClient,
    private pipeAddress: FullAddressPipe,
    protected overlayContainer: OverlayContainer
  ) {}

  ngAfterViewInit(): void {
    this.getLocation(this.address!).subscribe(
      (response: LocationResponse[]) => {
        this.streetCandidates = response;
        if (response) {
          this.selectedStreetCandidate = response[0];
        }
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

  public selectCandidate(candidate: LocationResponse) {
    this.selectedStreetCandidate = candidate;
    this.initializeMap(
      this.selectedStreetCandidate.lat,
      this.selectedStreetCandidate.lon
    );
  }

  private getLocation(address: FullAddress): Observable<LocationResponse[]> {
    const term: string = this.pipeAddress.transform(address, 'geolocation');
    return this.http.get<LocationResponse[]>(
      CreateComponent.mapSearchUrlPrefix +
        term +
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
        (response: LocationResponse) =>
          (this.selectedStreetCandidate = response)
      );
    });
  }
}
