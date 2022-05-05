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
import { map, Observable, startWith } from 'rxjs';
import * as L from 'leaflet';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { OnInit } from '@angular/core';
import { AddressEmitter } from '../../../utils/address/address-emitter';
import { InputForm } from './input-form';
import { MapComponent } from '../map/map.component';
import { ConfigureMap } from '../map/configure-map';
import { MapEvent } from '../map/map-event';
import { LocationResponse } from '../map/location-response';
import { Address, AddressService, Geolocation } from '@availa/agube-rest-api';

@Component({
  selector: 'app-map-location-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent
  extends MapComponent
  implements AfterViewInit, OnInit, OnChanges
{
  @Input() public inputForm!: InputForm;
  @Input() public resetForm: boolean = false;

  @ViewChild(MatSelectionList) public candidateComponents:
    | MatSelectionList
    | undefined;

  @Output() public addressForm: EventEmitter<AddressEmitter> =
    new EventEmitter<AddressEmitter>();

  public streetCandidates: LocationResponse[] = [];

  // filter
  public addressFormGroup: FormGroup | undefined;
  public filter: FormControl = new FormControl('', Validators.required);
  public street: FormControl | undefined;
  public number: FormControl | undefined;
  public flat: FormControl | undefined;
  public gate: FormControl | undefined;

  public autocomplete: Address[] = [];

  // You can override this url for use other maps
  private zoom : number = MapComponent.zoom;
  private static mapSearchCoordinatesUrlPrefix: string = `https://nominatim.openstreetmap.org/reverse?`;
  private static mapSearchUrlPrefix: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static mapSearchUrlSufix: string = `&polygon_geojson=1&limit=7&format=jsonv2&addressdetails=1`;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private svcAddress: AddressService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['resetForm'].currentValue &&
        !changes['resetForm'].previousValue) ||
      changes['resetForm'].currentValue != changes['resetForm'].previousValue
    ) {
      this.resetThisComponent();
    }
  }

  ngOnInit(): void {
    if (!this.inputForm) {
      throw new Error('inputForm is neccessary for this component');
    }

    this.street = this.inputForm.street;
    this.number = this.inputForm.number;
    this.flat = this.inputForm.flat;
    this.gate = this.inputForm.gate;
    this.addressFormGroup = this.formBuilder.group({
      filter: this.filter,
      street: this.street,
      number: this.number,
      flat: this.flat,
      gate: this.gate,
    });

    this.addressFormGroup.valueChanges.subscribe((response: FormGroup) => {
      if (this.selectedStreetCandidate) {
        this.fillMissingAddress(this.selectedStreetCandidate);
        this.addressForm.emit({
          addressFormGroup: this.addressFormGroup!,
          location: this.selectedStreetCandidate,
        });
      }
    });

    this.svcAddress.getAddress().subscribe((response) => {
      this.autocomplete = response;
      if (response.length > 0) {
        this.selectOptionFilter(response[0]);
      }
    });
  }

  override ngAfterViewInit(): void {
    this.initializeMap(this.configureMap!);
  }

  public selectOptionFilter(option: Address) {
    let filter = option.city + ', ' + option.road + ', ' + option.postcode;
    this.filtering(filter);
  }

  public filtering(filter?: string) {
    let myfilter = this.filter.value;

    if (filter) {
      myfilter = filter;
    }

    this.getLocationBySearch(myfilter).subscribe((response) => {
      if (!response.length) {
        return;
      }
      this.candidateComponents?.deselectAll();
      this.streetCandidates = response;
      this.selectedStreetCandidate = response[0];
      this.fillFormControls(this.selectedStreetCandidate);
      this.initializeMap({
        lat: this.selectedStreetCandidate.lat,
        lon: this.selectedStreetCandidate.lon,
        zoom: MapComponent.zoom,
        showCircle: true,
        height: this.configureMap!.height,
        dragging: this.configureMap!.dragging,
      });
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
    if (!this.selectedStreetCandidate) {
      return;
    }
    this.initializeMap({
      lat: this.selectedStreetCandidate.lat,
      lon: this.selectedStreetCandidate.lon,
      zoom: MapComponent.zoom,
      showCircle: true,
      height: this.configureMap!.height,
      dragging: this.configureMap!.dragging,
    });
  }

  public selectCandidate(candidate: LocationResponse) {
    this.selectedStreetCandidate = candidate;
    this.fillFormControls(this.selectedStreetCandidate);
    this.initializeMap({
      lat: this.selectedStreetCandidate.lat,
      lon: this.selectedStreetCandidate.lon,
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

      this.getLocationByCoordinate(+clickConf.lat, +clickConf.lon).subscribe(
        (response: LocationResponse) => {
          this.selectedStreetCandidate = response;
          this.selectedStreetCandidate.zoom = this.zoom;
          this.fillFormControls(this.selectedStreetCandidate);
        }
      );
    });
  }

  private getLocationBySearch(filter: string): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(
      CreateComponent.mapSearchUrlPrefix +
        filter +
        CreateComponent.mapSearchUrlSufix
    );
  }

  private getLocationByCoordinate(
    lat: number,
    lon: number
  ): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(
      CreateComponent.mapSearchCoordinatesUrlPrefix +
        `lat=${lat}&lon=${lon}` +
        CreateComponent.mapSearchUrlSufix
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

    // FIXME: move this in one pipe
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
