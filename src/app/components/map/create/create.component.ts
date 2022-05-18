import { HttpClient } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    Output,
    ViewChild,
    EventEmitter,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { OnInit } from '@angular/core';
import { AddressEmitter } from '../../../utils/address/address-emitter';
import { InputForm } from './input-form';
import { MapComponent } from '../map/map.component';
import { ConfigureMap } from '../map/configure-map';
import { MapEvent } from '../map/map-event';
import { LocationResponse } from '../map/location-response';
import { Address, AddressService } from '@availa/agube-rest-api';

@Component({
    selector: 'app-map-location-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends MapComponent implements AfterViewInit, OnInit, OnChanges {
    @Input() public addressInputForm!: InputForm;
    @Input() public resetForm: boolean = false;

    @ViewChild(MatSelectionList) public candidateComponents: MatSelectionList | undefined;

    @Output() public addressForm: EventEmitter<AddressEmitter> = new EventEmitter<AddressEmitter>();

    public addressCandidates: LocationResponse[] = [];
    public loadingCandidates: boolean = false;
    public loadingMap: boolean = false;

    // filter
    public addressFormGroup: FormGroup | undefined;
    public filter: FormControl = new FormControl('', Validators.required);
    public country: FormControl | undefined;
    public state: FormControl | undefined;
    public province: FormControl | undefined;
    public city: FormControl | undefined;
    public village: FormControl | undefined;
    public municipality: FormControl | undefined;
    public city_district: FormControl | undefined;
    public cp: FormControl | undefined;
    public street: FormControl | undefined;
    public number: FormControl | undefined;
    public flat: FormControl | undefined;
    public gate: FormControl | undefined;

    public autocomplete: Address[] = [];
    public clickUser: ConfigureMap | undefined;

    private mapId = 'create_map';

    // You can override this url for use other maps
    private zoom: number = MapComponent.zoom;
    private static mapSearchCoordinatesUrlPrefix: string = `https://nominatim.openstreetmap.org/reverse?`;
    private static mapSearchUrlPrefix: string = `https://nominatim.openstreetmap.org/search.php?q=`;
    private static mapSearchUrlSufix: string = `&polygon_geojson=1&limit=7&format=jsonv2&addressdetails=1`;

    constructor(private http: HttpClient, private formBuilder: FormBuilder, private svcAddress: AddressService) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if parent says reset form then reset
        let current = changes['resetForm'].currentValue;
        let previous = changes['resetForm'].previousValue;
        let hasValues = current && previous !== undefined;
        let areDifferent = current !== previous;

        if (hasValues && areDifferent) {
            this.resetThisComponent();
        }
    }

    ngOnInit(): void {
        if (!this.addressInputForm) {
            throw new Error('inputForm is necessary for this component');
        }

        // parent can initialize the Address Input Form
        this.country = this.addressInputForm.country;
        this.state = this.addressInputForm.state;
        this.province = this.addressInputForm.province;
        this.city = this.addressInputForm.city;
        this.village = this.addressInputForm.village;
        this.municipality = this.addressInputForm.municipality;
        this.city_district = this.addressInputForm.city_district;
        this.cp = this.addressInputForm.cp;
        this.street = this.addressInputForm.street;
        this.number = this.addressInputForm.number;
        this.flat = this.addressInputForm.flat;
        this.gate = this.addressInputForm.gate;

        this.addressFormGroup = this.formBuilder.group({
            filter: this.filter,
            country: this.country,
            state: this.state,
            province: this.province,
            city: this.city,
            village: this.village,
            municipality: this.municipality,
            city_district: this.city_district,
            cp: this.cp,
            street: this.street,
            number: this.number,
            flat: this.flat,
            gate: this.gate,
        });

        // on address form value has changed
        this.addressFormGroup.valueChanges.subscribe((response: FormGroup) => {
            // if Street has been selected
            if (this.selectedStreetCandidate) {
                // fill missing address fields
                this.fillMissingAddress(this.selectedStreetCandidate);

                if (this.clickUser) {
                    this.selectedStreetCandidate.lat = this.clickUser!.lat;
                    this.selectedStreetCandidate.lon = this.clickUser!.lon;
                }

                // emit the address
                this.addressForm.emit({
                    addressFormGroup: this.addressFormGroup!,
                    location: this.selectedStreetCandidate,
                });
            }
        });

        // receive all addresses from the manager for initialize the autocomplete
        this.loadAutocomplete();
    }

    override ngAfterViewInit(): void {
        // do not execute ngAfterViewInit here
    }

    public selectOptionFilter(option: Address) {
        // override the form with selected candidate information
        if (this.street && this.cp) {
            this.country?.setValue(option.country);
            this.state?.setValue(option.state);
            this.province?.setValue(option.province);
            this.city?.setValue(option.city);
            this.village?.setValue(option.village);
            this.municipality?.setValue(option.municipality);
            this.city_district?.setValue(option.city_district);
            this.cp?.setValue(option.postcode);
            this.street?.setValue(option.road);
        }
        // do filtering
        this.filtering(option);
    }

    public filtering(option?: Address) {
        this.loadingCandidates = true;
        // get the filter value on the html filter
        let localFilter = this.filter.value;

        // if method has been called with parameter override the local filter
        if (option) {
            // filter with option selected
            localFilter = option.country + ', ' + option.state + ', ' + option.city + ', ' + option.road;
        }

        // get location with the local filter
        this.getLocationBySearch(localFilter).subscribe((response) => {
            if (!response.length && option) {
                // if road filter not working, filter again without using road
                // retry filter again
                // filter with country, state and city because the map can't search the road sometimes
                localFilter = option.country + ', ' + option.state + ', ' + option.city;
                // get location with the local filter
                this.getLocationBySearch(localFilter).subscribe((response) => {
                    if (!response.length) {
                        // if no response, do nothing
                        return;
                    }
                    // candidate components unselect
                    this.candidateComponents?.deselectAll();
                    // replace address candidate with news
                    this.addressCandidates = response;
                    // select first option as candidate
                    this.selectCandidate(response[0], this.clickUser);
                    this.loadingCandidates = false;
                });
            } else {
                // candidate components unselect
                this.candidateComponents?.deselectAll();
                // replace address candidate with news
                this.addressCandidates = response;
                // select first option as candidate
                this.selectCandidate(response[0], this.clickUser);
                this.loadingCandidates = false;
            }
        });
    }

    public clearFilter() {
        this.filter.setValue('');
        this.initializeMap(this.configureMap!);
    }

    /**
     * On candidate selected in the html
     * @param candidate
     */
    public selectCandidate(candidate: LocationResponse, clickConf?: ConfigureMap) {
        let lat: string = candidate.lat;
        let lon: string = candidate.lon;

        this.selectedStreetCandidate = candidate;
        // ensure that form controls is filled
        this.fillFormControls(this.selectedStreetCandidate);

        // reset the map to new location
        if (clickConf) {
            lat = clickConf.lat;
            lon = clickConf.lon;
        }

        this.initializeMap({
            id: this.mapId,
            lat: lat,
            lon: lon,
            zoom: MapComponent.zoom,
            showCircle: true,
            height: this.configureMap!.height,
            dragging: this.configureMap!.dragging,
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'filter':
                if (this.filter && this.filter.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FILTER.VALIDATION';
                }
                return '';
            case 'number':
                if (this.number && this.number.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.NUMBER.VALIDATION';
                }
                return '';
            case 'street':
                if (this.street && this.street.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.STREET.VALIDATION';
                }
                return '';
            case 'cp':
                if (this.cp && this.cp.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.CP.VALIDATION';
                }
                return '';
            case 'state':
                if (this.state && this.state.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.STATE.VALIDATION';
                }
                return '';
            case 'municipality':
                if (this.municipality && this.municipality.hasError('required')) {
                    return 'COMPONENTS.MAP.CREATE.FORM.MUNICIPALITY.VALIDATION';
                }
                return '';
            default:
                return '';
        }
    }

    /**
     * receive all addresses from the manager for initialize the autocomplete
     */
    private loadAutocomplete() {
        this.svcAddress.getAddress().subscribe((response) => {
            this.autocomplete = response;
            // if has some address set as selected option in filter
            if (
                response.length > 0 &&
                this.configureMap &&
                this.configureMap.selectOptionFilter !== undefined &&
                this.configureMap.selectOptionFilter === false
            ) {
                this.selectOptionFilter(response[0]);
            } else if (this.configureMap && this.configureMap.selectOptionFilter === true) {
                // go to the location configured
                this.getLocationByCoordinate(Number(this.configureMap!.lat), Number(this.configureMap!.lon)).subscribe(
                    (response: LocationResponse) => {
                        this.candidateComponents?.deselectAll();
                        this.selectCandidate(response, this.configureMap);
                    }
                );
            }
        });
    }

    protected override initializeMap(conf: ConfigureMap): void {
        this.loadingMap = true;

        setTimeout(() => {
            if (this.map) {
                this.map.remove();
            }

            this.zoom = conf.zoom;
            this.map = L.map('map', {
                center: [+conf.lat, +conf.lon],
                doubleClickZoom: false,
                zoom: this.zoom,
            });

            const tiles = L.tileLayer(this.mapViewUrl, {
                maxZoom: MapComponent.zoomMax,
                minZoom: MapComponent.zoomMin,
            });

            tiles.addTo(this.map);

            let circle: L.Circle | undefined = undefined;
            if (conf.showCircle) {
                circle = L.circle([+conf.lat, +conf.lon], {
                    fillColor: '#7fd3f7',
                    fillOpacity: 0.5,
                    radius: 10,
                }).addTo(this.map);
            }

            if (this.filter.invalid) {
                return;
            }

            this.map.on('click', (e: MapEvent) => {
                if (e.sourceTarget._animateToZoom) {
                    this.zoom = e.sourceTarget._animateToZoom;
                }

                let clickConf: ConfigureMap = {
                    id: this.mapId,
                    lat: e.latlng.lat,
                    lon: e.latlng.lng,
                    zoom: this.zoom,
                    showCircle: true,
                    height: conf.height,
                    dragging: conf.dragging,
                };

                if (circle) {
                    this.map.removeLayer(circle);
                }

                this.initializeMap(clickConf);
                this.clickUser = clickConf;

                this.getLocationByCoordinate(Number(clickConf.lat), Number(clickConf.lon)).subscribe(
                    (response: LocationResponse) => {
                        this.selectCandidate(response, clickConf);
                        if (this.selectedStreetCandidate) {
                            this.selectedStreetCandidate.zoom = this.zoom;
                        }
                    }
                );
            });
            this.loadingMap = false;
        }, 1000);
    }

    private getLocationBySearch(filter: string): Observable<LocationResponse[]> {
        return this.http.get<LocationResponse[]>(
            CreateComponent.mapSearchUrlPrefix + filter + CreateComponent.mapSearchUrlSufix
        );
    }

    private getLocationByCoordinate(lat: number, lon: number): Observable<LocationResponse> {
        return this.http.get<LocationResponse>(
            CreateComponent.mapSearchCoordinatesUrlPrefix + `lat=${lat}&lon=${lon}` + CreateComponent.mapSearchUrlSufix
        );
    }

    private resetThisComponent() {
        this.loadAutocomplete();
        this.number?.setValue('');
        this.flat?.setValue('');
        this.gate?.setValue('');
    }

    private fillFormControls(location: LocationResponse) {
        if (!location.zoom) {
            location.zoom = MapComponent.zoom;
        }

        // FIXME: move this to pipe
        this.filter.setValue(location.display_name);

        if (this.street && location.address.road && this.cp) {
            this.street.setValue(location.address.road);
            this.cp.setValue(location.address.postcode);
        }

        if (this.number && !this.number.value) {
            this.number.setValue(location.address.house_number);
        }

        let city = location.address.city;
        if (!city) {
            city = location.address.state;
        }

        if (!city) {
            city = location.address.country;
        }

        if (!location.address.city) {
            location.address.city = city;
        }

        if (!location.address.province) {
            location.address.province = city;
        }

        if (!location.address.municipality) {
            location.address.municipality = city;
        }

        if (!location.address.postcode) {
            location.address.postcode = '0000';
        }

        if (!location.address.city_district) {
            location.address.city_district = city;
        }
    }

    private fillMissingAddress(location: LocationResponse) {
        // city in isolated places can be empty
        if (!location.address.city) {
            // fill isolated city with municipality place
            location.address.city = location.address.municipality;
        }

        // city_district in isolated places can be empty
        // fill isolated city_district with municipality place
        if (!location.address.city_district && location.address.village) {
            location.address.city_district = location.address.village;
        } else if (!location.address.city_district && !location.address.village) {
            location.address.city_district = location.address.municipality;
        }
    }
}
