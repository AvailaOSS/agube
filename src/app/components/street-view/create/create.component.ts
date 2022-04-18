import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { FullAddress } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import { FullAddressPipe } from 'src/app/pipes/full-address.pipe';

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
export class CreateComponent implements OnInit {
  @Input() public id: number | undefined;
  @Input() public address: FullAddress | undefined;

  @ViewChild(GoogleMap) map!: GoogleMap;

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
}
