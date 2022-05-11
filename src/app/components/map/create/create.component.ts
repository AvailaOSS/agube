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

    // filter
    public addressFormGroup: FormGroup | undefined;
    public filter: FormControl = new FormControl('', Validators.required);
    public street: FormControl | undefined;
    public number: FormControl | undefined;
    public flat: FormControl | undefined;
    public gate: FormControl | undefined;

    public autocomplete: Address[] = [];
    public clickUser: ConfigureMap | undefined;
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
        if (
            (changes['resetForm'].currentValue && !changes['resetForm'].previousValue) ||
            changes['resetForm'].currentValue != changes['resetForm'].previousValue
        ) {
            this.resetThisComponent();
        }
    }

    ngOnInit(): void {
        if (!this.addressInputForm) {
            throw new Error('inputForm is necessary for this component');
        }

        // parent can initialize the Address Input Form
        this.street = this.addressInputForm.street;
        this.number = this.addressInputForm.number;
        this.flat = this.addressInputForm.flat;
        this.gate = this.addressInputForm.gate;
        this.addressFormGroup = this.formBuilder.group({
            filter: this.filter,
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
                // emit the address
                this.addressForm.emit({
                    addressFormGroup: this.addressFormGroup!,
                    location: this.selectedStreetCandidate,
                });
            }
        });

        // receive all addresses from the manager for initialize the autocomplete
        this.svcAddress.getAddress().subscribe((response) => {
            this.autocomplete = response;
            // if has some address set as selected option in filter
            if (response.length > 0) {
                this.selectOptionFilter(response[0]);
            }
        });
    }

    override ngAfterViewInit(): void {
        // on angular view initialized, then load the map with this configuration
        this.initializeMap(this.configureMap!);
    }

    public selectOptionFilter(option: Address) {
        // override the form with selected candidate information
        if (this.street) {
            this.street.setValue(option.road);
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
                    this.selectCandidate(response[0],this.clickUser);
                    this.loadingCandidates = false;
                });
            } else {
                // candidate components unselect
                this.candidateComponents?.deselectAll();
                // replace address candidate with news
                this.addressCandidates = response;
                // select first option as candidate
                this.selectCandidate(response[0],this.clickUser);
                this.loadingCandidates = false;
            }
        });
    }

    public clearFilter() {
        this.filter.setValue('');
        this.initializeMap(this.configureMap!);
    }

    public mouseIsOver(candidate: LocationResponse) {
        this.initializeMap({
            lat: candidate.lat,
            lon: candidate.lon,
            zoom: MapComponent.zoom,
            showCircle: true,
            height: this.configureMap!.height,
            dragging: this.configureMap!.dragging,
        });
    }

    public mouseIsOut() {
        if (!this.clickUser) {
            return;
        }
        this.initializeMap({
            lat: this.clickUser.lat,
            lon: this.clickUser.lon,
            zoom: MapComponent.zoom,
            showCircle: true,
            height: this.configureMap!.height,
            dragging: this.configureMap!.dragging,
        });
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
            default:
                return '';
        }
    }

    protected override initializeMap(conf: ConfigureMap): void {
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

        if (this.street && location.address.road) {
            this.street.setValue(location.address.road);
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
