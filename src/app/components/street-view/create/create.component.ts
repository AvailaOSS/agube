import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FullAddress } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import { FullAddressPipe } from 'src/app/pipes/full-address.pipe';
import * as L from 'leaflet';

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

  private map: any;

  public selectedStreetCandidate: any;
  public streetCandidates: any[] = [];

  private static mapURL: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static sufixMapURL: string = `&polygon_geojson=1&format=jsonv2`;

  constructor(private http: HttpClient, private pipeAddress: FullAddressPipe) {}

  ngAfterViewInit(): void {
    this.getLocation(this.address!).subscribe((response: any) => {
      this.streetCandidates = response;
      this.selectedStreetCandidate = response[0];
      this.initializeMap(
        this.selectedStreetCandidate.lat,
        this.selectedStreetCandidate.lon
      );
    });
  }

  public selectCandidate(candidate: any) {
    this.selectedStreetCandidate = candidate;
    console.log(this.selectedStreetCandidate);
    this.map.remove();
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

  private initializeMap(lat: number, lon: number): void {
    console.log(this.selectedStreetCandidate);
    this.map = L.map('map', {
      center: [lat, lon],
      zoom: 15,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 13,
      }
    );

    tiles.addTo(this.map);
  }
}
