import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.dev';
import { MapLocation } from './map-location';

@Component({
  selector: 'app-page-dwelling-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements AfterViewInit {
  location: MapLocation = {
    latitude: 42.2291769,
    longitude: -8.719337,
    zoom: 15,
    horizontalDegree: -20,
    verticalDegree: -10,
  };

  @ViewChild(GoogleMap) map: GoogleMap | undefined;

  apiLoaded: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' +
          environment.googleMapsApiKey,
        'callback'
      )
      .pipe(
        map(() => {
          console.log('NO ERROR');
        }),
        catchError((error: any) => {
          console.log('ERROR', error);
          return of(error);
        })
      );
  }

  ngAfterViewInit() {
    if (!this.map) {
      return;
    }
    const streetView = this.map.getStreetView();

    streetView.setOptions({
      position: { lat: this.location.latitude, lng: this.location.longitude },
      pov: { heading: -20, pitch: -10 },
    });

    streetView.setVisible(true);
  }
}
