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
export class CreateComponent implements OnInit, AfterViewInit {
  @Input() public id: number | undefined;
  @Input() public address: FullAddress | undefined;

  private map: any;

  public selectedStreetCandidate: any;
  public streetCandidates: any[] = [];

  private static mapURL: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static sufixMapURL: string = `&polygon_geojson=1&format=jsonv2`;

  constructor(private http: HttpClient, private pipeAddress: FullAddressPipe) {}

  ngOnInit(): void {
    this.getLocation(this.address!).subscribe((response: any) => {
      this.streetCandidates = response;
      this.selectedStreetCandidate = response[0];
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  public selectCandidate(candidate: any) {
    this.selectedStreetCandidate = candidate;
  }

  private getLocation(address: FullAddress): Observable<GeocoderResponse> {
    const term: string = this.pipeAddress.transform(address, 'geolocation');
    console.log(term);
    return this.http.get<GeocoderResponse>(
      CreateComponent.mapURL + term + CreateComponent.sufixMapURL
    );
  }

  private initializeMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
    console.log('hoal', this.map);
  }
}
