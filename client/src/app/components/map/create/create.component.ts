import { HttpClient } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { Router } from '@angular/router';
import { Address, AddressService } from '@availaoss/agube-rest-api';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { ConfigureMap } from '../map/configure-map';
import { LocationResponse } from '../map/location-response';
import { MapEvent } from '../map/map-event';
import { MapComponent } from '../map/map.component';
import { InputForm } from './input-form';
import {
    fillMissingAddressFields,
    MapAddressCreator,
    MapAddressForm,
    mapAddressFormBuilder,
} from './map-address-creator';

@Component({
    selector: 'app-map-location-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class CreateComponent extends MapComponent implements MapAddressCreator, AfterViewInit, OnInit, OnChanges {
    // -------------------------- MapAddressCreator vars -------------------------- //
    form: MapAddressForm | undefined;
    addressAlreadyCreated: Address[];
    addressExamples: LocationResponse[];

    // -------------------------- Public Class vars -------------------------- //
    @Input() public addressInputForm!: InputForm;
    @Input() public resetForm: boolean = false;

    @ViewChild(MatSelectionList) public addressExampleSelector: MatSelectionList | undefined;

    @Output() public addressForm: EventEmitter<AddressEmitter> = new EventEmitter<AddressEmitter>();

    public userHasFiltered: boolean = false;
    public userHasMapClicked: boolean = false;
    public automaticMode: boolean = false;
    public loadingExamples: boolean = false;
    public loadingMap: boolean = false;
    public globalMapConfig: ConfigureMap | undefined;

    // -------------------------- Private Class vars -------------------------- //
    // You can override this url for use other maps
    private zoom: number = MapComponent.zoom;
    private readonly waitToMapReload: number = 1000;
    private static readonly mapSearchCoordinatesUrlPrefix: string = `https://nominatim.openstreetmap.org/reverse?`;
    private static readonly mapSearchUrlPrefix: string = `https://nominatim.openstreetmap.org/search.php?q=`;
    private static readonly mapSearchUrlSuffix: string = `&polygon_geojson=1&limit=7&format=jsonv2&addressdetails=1`;

    // -------------------------- Angular Lifecycle -------------------------- //

    constructor(
        protected override router: Router,
        protected http: HttpClient,
        protected formBuilder: FormBuilder,
        protected svcAddress: AddressService
    ) {
        super(router);
        this.form = undefined;
        this.addressAlreadyCreated = [];
        this.addressExamples = [];
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.resetFormIfHasChanged('resetForm', changes);
    }

    public ngOnInit(): void {
        this.form = mapAddressFormBuilder(this.addressInputForm);
        this.loadAddressAlreadyCreatedAndDrawMap();
    }

    override ngAfterViewInit(): void {
        // do not execute ngAfterViewInit here
    }

    // -------------------------- End Angular Lifecycle -------------------------- //
    // -------------------------- Override Extends MapComponent -------------------------- //

    protected override initializeMap(conf: ConfigureMap): void {
        this.loadingMap = true;

        setTimeout(() => {
            if (this.map) {
                this.map.remove();
            }

            this.zoom = conf.zoom;
            this.map = L.map(this.baseConfiguration!.id, {
                center: [+conf.center.lat, +conf.center.lon],
                doubleClickZoom: false,
                zoom: this.zoom,
            });

            const tiles = L.tileLayer(this.mapViewUrl, {
                maxZoom: MapComponent.zoomMax,
                minZoom: MapComponent.zoomMin,
            });

            tiles.addTo(this.map);

            let marker: L.Marker | undefined = undefined;
            if (conf.showMarker && (this.userHasMapClicked || this.automaticMode)) {
                marker = this.setMarker(conf.center);
            }

            if (conf.otherPoints) {
                conf.otherPoints.forEach((point) => this.setMarker(point));
            }

            this.loadingMap = false;

            this.map.on('click', (e: MapEvent) => {
                if (e.sourceTarget._animateToZoom) {
                    this.zoom = e.sourceTarget._animateToZoom;
                }

                this.globalMapConfig = {
                    id: this.baseConfiguration!.id,
                    center: {
                        lat: e.latlng.lat,
                        lon: e.latlng.lng,
                        type: conf.center.type,
                    },
                    zoom: this.zoom,
                    showMarker: true,
                    height: conf.height,
                    dragging: conf.dragging,
                    otherPoints: conf.otherPoints,
                };

                if (marker) {
                    this.map.removeLayer(marker);
                }

                // duplicated command, it already running in putLocationInMap
                // this.initializeMap(this.globalMapConfig);

                this.searchLocationByCoordinate(
                    Number(this.globalMapConfig.center.lat),
                    Number(this.globalMapConfig.center.lon)
                ).subscribe((response: LocationResponse) => {
                    this.putLocationInMap(response, this.globalMapConfig);
                    if (this.selectedStreetCandidate) {
                        this.selectedStreetCandidate.zoom = this.zoom;
                    }
                });

                this.userHasMapClicked = true;
            });
        }, this.waitToMapReload);
    }

    // -------------------------- End Override Extends MapComponent -------------------------- //
    // -------------------------- Class Methods by Interface MapAddressCreator -------------------------- //

    public resetFormIfHasChanged(formName: string, changes: SimpleChanges): void {
        // if parent says reset form then reset
        let current = changes[formName].currentValue;
        let previous = changes[formName].previousValue;
        let hasValues = current && previous !== undefined;
        let areDifferent = current !== previous;

        if (hasValues && areDifferent) {
            this.form!.reset();
            this.loadAddressAlreadyCreatedAndDrawMap();
        }
    }

    public loadAddressAlreadyCreatedAndDrawMap(): void {
        this.svcAddress.getAddress().subscribe((response) => {
            this.addressAlreadyCreated = response;
            // if has some address set as selected option in filter
            if (this.baseConfiguration && this.baseConfiguration.selectOptionFilter === true) {
                const lat: number = Number(this.baseConfiguration!.center.lat);
                const lon: number = Number(this.baseConfiguration!.center.lon);
                // go to the location configured
                this.searchLocationByCoordinate(lat, lon).subscribe((response: LocationResponse) => {
                    // ensure that lat and lon is the user settled
                    response.lat = String(lat);
                    response.lon = String(lon);
                    this.putLocationInMap(response);
                });
            }
        });
    }

    public loadAddressExamples(address?: Address): void {
        this.userHasFiltered = true;
        this.loadingExamples = true;

        // get the filter value on the html filter
        let searching = this.form!.filter.value;

        // if method has been called with parameter override the local filter
        if (address) {
            // filter with address selected
            searching = address.country + ', ' + address.state + ', ' + address.city + ', ' + address.road;
            this.form?.filter.setValue(address.road);
        }

        // get location with the local filter
        this.searchLocation(searching).subscribe((response) => {
            if (!response.length && address) {
                // if road filter not working, filter again without using road
                // retry filter again
                // filter with country, state and city because the map can't search the road sometimes
                searching = address.country + ', ' + address.state + ', ' + address.city;
                // get location with the local filter
                this.searchLocation(searching).subscribe((response) => {
                    this.loadAddressExamplesFromResponse(response);
                });
            } else {
                this.loadAddressExamplesFromResponse(response);
            }
        });
    }

    public putLocationInMap(location: LocationResponse, mapConfiguration?: ConfigureMap | undefined): void {
        let lat: string = location.lat;
        let lon: string = location.lon;

        let zoom: number = location.zoom;
        if (!location.zoom) {
            zoom = MapComponent.zoom;
            location.zoom = MapComponent.zoom;
        }
        this.selectedStreetCandidate = location;

        // if has new configuration, replace config
        if (mapConfiguration) {
            lat = mapConfiguration.center.lat;
            lon = mapConfiguration.center.lon;
            this.selectedStreetCandidate = {
                address: location.address,
                display_name: location.display_name,
                lat,
                lon,
                zoom,
            };
        } else {
            // with automatic selection
            if (this.automaticMode) {
                this.userHasMapClicked = true;
            } else {
                this.userHasMapClicked = false;
            }
        }

        //  ensure that form controls is filled
        if (!this.form) {
            throw new Error('form must be initialized before this');
        }

        if (!this.automaticMode) {
            fillMissingAddressFields(this.form, this.selectedStreetCandidate);
        }

        // reset the map to new location
        this.initializeMap({
            id: this.baseConfiguration.id,
            center: {
                lat: lat,
                lon: lon,
                type: this.baseConfiguration.center.type,
            },
            zoom: MapComponent.zoom,
            showMarker: true,
            height: this.baseConfiguration!.height,
            dragging: this.baseConfiguration!.dragging,
            otherPoints: this.baseConfiguration?.otherPoints,
        });

        // emit the address
        this.addressForm.emit({
            userHasMapClicked: this.userHasMapClicked,
            addressFormGroup: this.formBuilder.group({
                filter: this.form!.filter,
                country: this.form!.country,
                state: this.form!.state,
                province: this.form!.province,
                city: this.form!.city,
                village: this.form!.village,
                municipality: this.form!.municipality,
                city_district: this.form!.city_district,
                cp: this.form!.cp,
                street: this.form!.street,
                number: this.form!.number,
                flat: this.form!.flat,
                gate: this.form!.gate,
            }),
            location: this.selectedStreetCandidate,
        });
    }

    public searchLocation(filter: string): Observable<LocationResponse[]> {
        return this.http.get<LocationResponse[]>(
            CreateComponent.mapSearchUrlPrefix + filter + CreateComponent.mapSearchUrlSuffix
        );
    }

    public searchLocationByCoordinate(lat: number, lon: number): Observable<LocationResponse> {
        return this.http.get<LocationResponse>(
            CreateComponent.mapSearchCoordinatesUrlPrefix + `lat=${lat}&lon=${lon}` + CreateComponent.mapSearchUrlSuffix
        );
    }

    // -------------------------- End Class Methods by Interface MapAddressCreator -------------------------- //
    // -------------------------- Class Methods  -------------------------- //

    public clearFilter(): void {
        this.userHasFiltered = false;
        this.userHasMapClicked = false;
        this.form!.clearFilter();
        this.addressForm.emit({
            userHasMapClicked: this.userHasMapClicked,
            addressFormGroup: this.formBuilder.group({
                filter: this.form!.filter,
                country: this.form!.country,
                state: this.form!.state,
                province: this.form!.province,
                city: this.form!.city,
                village: this.form!.village,
                municipality: this.form!.municipality,
                city_district: this.form!.city_district,
                cp: this.form!.cp,
                street: this.form!.street,
                number: this.form!.number,
                flat: this.form!.flat,
                gate: this.form!.gate,
            }),
            location: this.selectedStreetCandidate!,
        });
    }

    public checkField(entity: string): void {
        Object.entries(this.form!).find(([key, value]) => {
            if (key === entity) {
                if (value.value !== undefined && value.value.length > 0) {
                    value.setErrors(null);
                }
            }
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'filter':
                if (this.form!.filter && this.form!.filter.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FILTER.VALIDATION';
                }
                return '';
            case 'country':
                if (this.form!.country && this.form!.country.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.COUNTRY.VALIDATION';
                }
                return '';
            case 'state':
                if (this.form!.state && this.form!.state.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.STATE.VALIDATION';
                }
                return '';
            case 'province':
                if (this.form!.province && this.form!.province.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.PROVINCE.VALIDATION';
                }
                return '';
            case 'city':
                if (this.form!.city && this.form!.city.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CITY.VALIDATION';
                }
                if (this.form!.city && this.form!.city.hasError('check')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CHECK.ERROR';
                }
                return '';
            case 'municipality':
                if (this.form!.municipality && this.form!.municipality.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.MUNICIPALITY.VALIDATION';
                }
                if (this.form!.municipality && this.form!.municipality.hasError('check')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CHECK.ERROR';
                }
                return '';
            case 'city_district':
                if (this.form!.city_district && this.form!.city_district.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CITY_DISTRICT.VALIDATION';
                }
                if (this.form!.city_district && this.form!.city_district.hasError('check')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CHECK.ERROR';
                }
                return '';
            case 'cp':
                if (this.form!.cp && this.form!.cp.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CP.VALIDATION';
                }
                if (this.form!.cp && this.form!.cp.hasError('check')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CHECK.ERROR';
                }
                return '';
            case 'street':
                if (this.form!.street && this.form!.street.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.STREET.VALIDATION';
                }
                if (this.form!.street && this.form!.street.hasError('check')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CHECK.ERROR';
                }
                return '';
            case 'number':
                if (this.form!.number && this.form!.number.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.NUMBER.VALIDATION';
                }
                if (this.form!.number && this.form!.number.hasError('check')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CHECK.ERROR';
                }
                return '';
            default:
                return '';
        }
    }

    private loadAddressExamplesFromResponse(response: LocationResponse[]) {
        if (!response.length) {
            // if no response, do nothing
            return;
        }
        // candidate components unselect
        this.addressExampleSelector?.deselectAll();
        // replace address candidate with news
        this.addressExamples = response;
        // select first address as candidate
        this.putLocationInMap(response[0]);
        this.loadingExamples = false;
    }
}
