import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LocationResponse } from './location-response';
import { ConfigureMap } from './configure-map';
import * as L from 'leaflet';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
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

    constructor() {}

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
            scrollWheelZoom: undefined,
        });

        const tiles = L.tileLayer(this.mapViewUrl, {
            maxZoom: MapComponent.zoomMax,
            minZoom: MapComponent.zoomMin,
        });

        tiles.addTo(this.map);

        if (conf.showCircle) {
            this.setCircle(+conf.center.lat, +conf.center.lon);
        }
    }

    protected setCircle(
        lat: number,
        lon: number,
        popupDescription: string | undefined = undefined,
        circleColor = MapComponent.circleColor,
        circleOpacity = MapComponent.circleOpacity,
        circleRadius = MapComponent.circleRadius
    ) {
        let circle = L.circle([lat, lon], {
            fillColor: circleColor,
            fillOpacity: circleOpacity,
            radius: circleRadius,
        }).addTo(this.map);

        if (popupDescription) {
            circle.bindPopup(popupDescription);

            circle.on('mouseover', (ev) => {
                ev.target.openPopup();
            });
            circle.on('mouseout', (ev) => {
                ev.target.closePopup();
            });
        }

        return circle;
    }
}
