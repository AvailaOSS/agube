import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigureView } from './map-location';

@Component({
    selector: 'app-street-view',
    templateUrl: './view.component.html',
})
export class StreetViewComponent implements OnInit, AfterViewInit {
    @Input() public configureView: ConfigureView | undefined;

    @ViewChild(GoogleMap) map: GoogleMap | undefined;

    public apiLoaded: Observable<boolean>;

    constructor(private httpClient: HttpClient) {
        this.apiLoaded = this.loadGoogleMapsApi();
    }

    ngOnInit(): void {
        if (!this.configureView) {
            throw new Error('This component needs location object');
        }
    }

    ngAfterViewInit() {
        this.configureStreetView();
    }

    private loadGoogleMapsApi(): Observable<boolean> {
        return this.httpClient
            .jsonp('https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsApiKey, 'callback')
            .pipe(
                map(() => {}),
                catchError((error: any) => {
                    return of(error);
                })
            );
    }

    private configureStreetView() {
        if (!this.configureView) {
            return;
        }

        if (!this.map) {
            return;
        }

        const streetView = this.map.getStreetView();

        streetView.setOptions({
            position: {
                lat: this.configureView.latitude,
                lng: this.configureView.longitude,
            },
            pov: {
                heading: this.configureView.horizontalDegree,
                pitch: this.configureView.verticalDegree,
            },
        });

        streetView.setVisible(true);
    }
}
