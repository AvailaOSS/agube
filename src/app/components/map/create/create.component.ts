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
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { OnInit } from '@angular/core';
import { AddressEmitter } from './address-emitter';
import { InputForm } from './input-form';
import { MapComponent } from '../map/map.component';
import { ConfigureMap } from '../map/configure-map';
import { MapEvent } from '../map/map-event';
import { LocationResponse } from '../map/location-response';

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

  // You can override this url for use other maps
  private static mapSearchCoordinatesUrlPrefix: string = `https://nominatim.openstreetmap.org/reverse?`;
  private static mapSearchUrlPrefix: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static mapSearchUrlSufix: string = `&polygon_geojson=1&limit=7&format=jsonv2&addressdetails=1`;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
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
  }

  override ngAfterViewInit(): void {
    this.initializeMap(this.configureMap!);
  }

  public filtering() {
    this.getLocationBySearch().subscribe((response) => {
      this.candidateComponents?.deselectAll();
      this.streetCandidates = response;
      this.selectedStreetCandidate = response[0];
      this.fillFormControls(this.selectedStreetCandidate);
      this.initializeMap({
        lat: this.selectedStreetCandidate.lat,
        lon: this.selectedStreetCandidate.lon,
        zoom: CreateComponent.zoom,
        showCircle: true,
        height: this.configureMap!.height,
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
      zoom: CreateComponent.zoom,
      showCircle: true,
      height: this.configureMap!.height,
    });
  }

  public mouseIsOut() {
    if (!this.selectedStreetCandidate) {
      return;
    }
    this.initializeMap({
      lat: this.selectedStreetCandidate.lat,
      lon: this.selectedStreetCandidate.lon,
      zoom: CreateComponent.zoom,
      showCircle: true,
      height: this.configureMap!.height,
    });
  }

  public selectCandidate(candidate: LocationResponse) {
    this.selectedStreetCandidate = candidate;
    this.fillFormControls(this.selectedStreetCandidate);
    this.initializeMap({
      lat: this.selectedStreetCandidate.lat,
      lon: this.selectedStreetCandidate.lon,
      zoom: CreateComponent.zoom,
      showCircle: true,
      height: this.configureMap!.height,
    });
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'filter':
        if (this.filter && this.filter.hasError('required')) {
          return 'STREET_VIEW.FILTER.VALIDATION';
        }
        return '';
      case 'number':
        if (this.number && this.number.hasError('required')) {
          return 'STREET_VIEW.FORM.NUMBER.VALIDATION';
        }
        return '';
      case 'street':
        if (this.street && this.street.hasError('required')) {
          return 'STREET_VIEW.FORM.STREET.VALIDATION';
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

    this.map = L.map('map', {
      center: [conf.lat, conf.lon],
      doubleClickZoom: false,
      zoom: conf.zoom,
    });

    const tiles = L.tileLayer(CreateComponent.mapViewUrl, {
      maxZoom: CreateComponent.zoomMax,
      minZoom: CreateComponent.zoomMin,
    });

    tiles.addTo(this.map);

    let circle: L.Circle | undefined = undefined;
    if (conf.showCircle) {
      circle = L.circle([conf.lat, conf.lon], {
        fillColor: '#7fd3f7',
        fillOpacity: 0.5,
        radius: 10,
      }).addTo(this.map);
    }

    if (this.filter.invalid) {
      return;
    }
    this.map.on('click', (e: MapEvent) => {
      let userZoom = CreateComponent.zoom;
      if (e.sourceTarget._animateToZoom) {
        userZoom = e.sourceTarget._animateToZoom;
      }

      let clickConf: ConfigureMap = {
        lat: e.latlng.lat,
        lon: e.latlng.lng,
        zoom: userZoom,
        showCircle: true,
        height: conf.height,
      };

      if (circle) {
        this.map.removeLayer(circle);
      }
      this.initializeMap(clickConf);

      this.getLocationByCoordinate(clickConf.lat, clickConf.lon).subscribe(
        (response: LocationResponse) => {
          this.selectedStreetCandidate = response;
          this.selectedStreetCandidate.zoom = userZoom;
          this.fillFormControls(this.selectedStreetCandidate);
        }
      );
    });
  }

  private getLocationBySearch(): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(
      CreateComponent.mapSearchUrlPrefix +
        this.filter.value +
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
      location.zoom = CreateComponent.zoom;
    }

    // FIXME: move this in one pipe
    this.filter.setValue(location.display_name);

    if (this.street) {
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
