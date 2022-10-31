import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { redirector } from 'src/app/utils/redirections/redirector';
import { ConfigureMap, Coordinates } from './configure-map';
import { LocationResponse } from './location-response';

@Component({
    selector: 'app-map',
    styleUrls: ['./map.component.scss'],
    templateUrl: './map.component.html',
})
export class MapComponent implements AfterViewInit {
    @Input() public baseConfiguration!: ConfigureMap;

    public selectedStreetCandidate: LocationResponse | undefined;

    protected map: any;

    public static readonly zoom: number = 18;
    public static readonly zoomMax: number = 19;
    public static readonly zoomMin: number = 4;

    protected mapViewUrl: string = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';

    // circle
    protected static readonly circleColor = '#7fd3f7';
    protected static readonly circleOpacity = 0.5;
    protected static readonly circleRadius = 10;

    constructor(protected router: Router) {}

    ngAfterViewInit(): void {
        if (!this.baseConfiguration) {
            throw new Error('Configure Map before call');
        }
        this.initializeMap(this.baseConfiguration);
    }

    protected initializeMap(conf: ConfigureMap): void {
        if (this.map) {
            this.map.remove();
        }
        this.map = L.map(conf.id, {
            center: [+conf.center.lat, +conf.center.lon],
            doubleClickZoom: false,
            zoom: conf.zoom,
            dragging: conf.dragging,
            scrollWheelZoom: conf.scrollWheelZoom,
        });

        const tiles = L.tileLayer(this.mapViewUrl, {
            maxZoom: MapComponent.zoomMax,
            minZoom: MapComponent.zoomMin,
        });

        tiles.addTo(this.map);

        if (conf.showMarker) {
            this.setMarker(conf.center);
        }

        if (conf.otherPoints) {
            conf.otherPoints.forEach((point) => this.setMarker(point));
        }
    }

    protected setMarker(point: Coordinates) {
        var myIcon = L.icon({
            iconUrl: point.type,
            iconSize: [30, 30],
        });

        let marker = L.marker([+point.lat, +point.lon], { icon: myIcon }).addTo(this.map);

        marker.on('click', () => redirector(this.router, point));

        if (point.description) {
            marker.bindPopup(point.description);
            marker.on('mouseover', (ev) => {
                ev.target.openPopup();
            });
            marker.on('mouseout', (ev) => {
                ev.target.closePopup();
            });
        }

        return marker;
    }
}
