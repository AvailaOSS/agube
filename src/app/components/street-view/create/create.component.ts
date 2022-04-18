import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { FullAddress } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import { FullAddressPipe } from 'src/app/pipes/full-address.pipe';
import * as L from 'leaflet';
import { OverlayContainer } from '@angular/cdk/overlay';

interface GeocoderResponse {
  status: string;
  error_message: string;
  results: google.maps.GeocoderResult[];
}

@Component({
  selector: 'app-street-view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements AfterViewInit {
  @Input() public id: number | undefined;
  @Input() public address: FullAddress | undefined;
  @HostBinding('class') className: any;
  private map: any;

  public selectedStreetCandidate: any;
  public streetCandidates: any[] = [];

  private static mapURLLatLng: string = `https://nominatim.openstreetmap.org/reverse?`;
  private static mapURL: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static sufixMapURL: string = `&polygon_geojson=1&limit=7&format=jsonv2`;

  constructor(
    private http: HttpClient,
    private pipeAddress: FullAddressPipe,
    protected overlayContainer: OverlayContainer
  ) {}

  ngAfterViewInit(): void {
    this.getLocation(this.address!).subscribe((response: any) => {
      this.streetCandidates = response;
      this.selectedStreetCandidate = response[0];
      this.initializeMap(
        this.selectedStreetCandidate.lat,
        this.selectedStreetCandidate.lon
      );
    });

    console.log(this.className);
  }

  public selectCandidate(candidate: any) {
    this.selectedStreetCandidate = candidate;
    console.log(this.selectedStreetCandidate);
    this.initializeMap(
      this.selectedStreetCandidate.lat,
      this.selectedStreetCandidate.lon
    );
  }

  private getLocation(address: FullAddress): Observable<GeocoderResponse> {
    const term: string = this.pipeAddress.transform(address, 'geolocation');
    console.log(term);
    return this.http.get<GeocoderResponse>(
      CreateComponent.mapURL + term + CreateComponent.sufixMapURL
    );
  }

  private getLocationByCoordinate(
    lat: number,
    lon: number
  ): Observable<GeocoderResponse> {
    return this.http.get<GeocoderResponse>(
      CreateComponent.mapURLLatLng +
        `lat=${lat}&lon=${lon}` +
        CreateComponent.sufixMapURL
    );
  }

  private initializeMap(lat: number, lon: number): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map', {
      center: [lat, lon],
      zoom: 18,
    });

    const tiles = L.tileLayer(
      // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', //Hybrid
      { maxZoom: 19, minZoom: 13 }
    );

    tiles.addTo(this.map);

    //DARK MODEs
    // const Stadia_AlidadeSmoothDark = L.tileLayer(
    //   'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    //   {
    //     maxZoom: 20,
    //     attribution:
    //       '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    //   }
    // );
    // Stadia_AlidadeSmoothDark.addTo(this.map);

    L.circle([lat, lon], {
      fillColor: '#7fd3f7',
      fillOpacity: 0.5,
      radius: 10,
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      let lat = e.latlng.lat;
      let lng = e.latlng.lng;
      this.initializeMap(lat, lng);

      this.getLocationByCoordinate(lat, lng).subscribe(
        (response) => (this.selectedStreetCandidate = response)
      );
    });
  }
}
