import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Output,
  ViewChild,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import { MapEvent } from './map-event';
import { LocationResponse } from './location-response';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { ConfigureMap } from './configure-map';
import { NumberSymbol } from '@angular/common';
import { OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-street-view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSelectionList) public candidateComponents:
    | MatSelectionList
    | undefined;

  @Output() public addressForm: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  public selectedStreetCandidate: LocationResponse | undefined;
  public streetCandidates: LocationResponse[] = [];

  // filter
  public addressFormGroup: FormGroup;
  public filter: FormControl = new FormControl('', Validators.required);
  public street: FormControl = new FormControl('', Validators.required);
  public number: FormControl = new FormControl('', Validators.required);
  public flat: FormControl = new FormControl('');
  public gate: FormControl = new FormControl('');

  private static zoom: number = 18;
  private static zoomMax: number = 19;
  private static zoomMin: number = 6;

  private map: any;

  // You can override this url for use other maps
  private static mapViewUrl: string =
    'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
  private static mapSearchCoordinatesUrlPrefix: string = `https://nominatim.openstreetmap.org/reverse?`;
  private static mapSearchUrlPrefix: string = `https://nominatim.openstreetmap.org/search.php?q=`;
  private static mapSearchUrlSufix: string = `&polygon_geojson=1&limit=7&format=jsonv2&addressdetails=1`;

  private static resetMapLocation: ConfigureMap = {
    lat: 39.92666,
    lon: -2.33976,
    zoom: 6,
    showCircle: false,
  };

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.addressFormGroup = this.formBuilder.group({
      street: this.street,
      filter: this.filter,
      number: this.number,
      flat: this.flat,
      gate: this.gate,
    });
  }

  ngOnInit(): void {
    this.addressFormGroup.valueChanges.subscribe((response: FormGroup) =>
      this.addressForm.emit(this.addressFormGroup)
    );
  }

  ngAfterViewInit(): void {
    this.initializeMap(CreateComponent.resetMapLocation);
  }

  public filtering() {
    this.getLocationBySearch().subscribe((response) => {
      this.candidateComponents?.deselectAll();
      this.streetCandidates = response;
      this.selectedStreetCandidate = response[0];
      this.filter.setValue(this.selectedStreetCandidate.display_name);
      this.street.setValue(this.selectedStreetCandidate.address.road);
      this.number.setValue(this.selectedStreetCandidate.address.house_number);
      this.initializeMap({
        lat: this.selectedStreetCandidate.lat,
        lon: this.selectedStreetCandidate.lon,
        zoom: CreateComponent.zoom,
        showCircle: true,
      });
    });
  }

  public clearFilter() {
    this.filter.setValue('');
    this.initializeMap(CreateComponent.resetMapLocation);
  }

  public selectCandidate(candidate: LocationResponse) {
    this.selectedStreetCandidate = candidate;
    this.filter.setValue(this.selectedStreetCandidate.display_name);
    this.street.setValue(this.selectedStreetCandidate.address.road);
    this.number.setValue(this.selectedStreetCandidate.address.house_number);
    this.initializeMap({
      lat: this.selectedStreetCandidate.lat,
      lon: this.selectedStreetCandidate.lon,
      zoom: CreateComponent.zoom,
      showCircle: true,
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

  private initializeMap(conf: ConfigureMap): void {
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
      };

      if (circle) {
        this.map.removeLayer(circle);
      }
      this.initializeMap(clickConf);

      this.getLocationByCoordinate(clickConf.lat, clickConf.lon).subscribe(
        (response: LocationResponse) => {
          this.selectedStreetCandidate = response;
          this.filter.setValue(this.selectedStreetCandidate.display_name);
          this.street.setValue(this.selectedStreetCandidate.address.road);
          this.number.setValue(
            this.selectedStreetCandidate.address.house_number
          );
        }
      );
    });
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'filter':
        if (this.number.hasError('required')) {
          return 'STREET_VIEW.FILTER.VALIDATION';
        }
        return '';
      case 'number':
        if (this.number.hasError('required')) {
          return 'STREET_VIEW.FORM.NUMBER.VALIDATION';
        }
        return '';
      case 'street':
        if (this.street.hasError('required')) {
          return 'STREET_VIEW.FORM.STREET.VALIDATION';
        }
        return '';
      default:
        return '';
    }
  }
}
