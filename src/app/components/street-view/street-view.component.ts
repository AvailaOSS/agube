import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapLocation } from './map-location';

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss'],
})
export class StreetViewComponent implements OnInit, AfterViewInit {
  @Input() public location: MapLocation | undefined;

  @ViewChild(GoogleMap) map: GoogleMap | undefined;

  public apiLoaded: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
    this.apiLoaded = this.loadGoogleMapsApi();
  }

  ngOnInit(): void {
    if (!this.location) {
      throw new Error('This component needs location object');
    }
  }

  ngAfterViewInit() {
    this.configureStreetView();
  }

  private loadGoogleMapsApi(): Observable<boolean> {
    return this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' +
          environment.googleMapsApiKey,
        'callback'
      )
      .pipe(
        map(() => {}),
        catchError((error: any) => {
          return of(error);
        })
      );
  }

  private configureStreetView() {
    if (!this.location) {
      return;
    }

    if (!this.map) {
      return;
    }

    const streetView = this.map.getStreetView();

    streetView.setOptions({
      position: { lat: this.location.latitude, lng: this.location.longitude },
      pov: {
        heading: this.location.horizontalDegree,
        pitch: this.location.verticalDegree,
      },
    });

    streetView.setVisible(true);
  }
}
