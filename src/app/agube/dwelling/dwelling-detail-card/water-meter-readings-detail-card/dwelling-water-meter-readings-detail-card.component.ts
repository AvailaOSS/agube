import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  DwellingService,
  WaterMeterMeasurement,
  WaterMeterWithMeasurements,
} from '@availa/agube-rest-api';
import { BehaviorSubject } from 'rxjs';
import { Header } from '@availa/table/lib/header';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewWaterFormComponent } from './new-water-meter-form/new-water-form/new-water-form.component';

@Component({
  selector: 'app-dwelling-water-meter-readings-detail-card',
  templateUrl: './dwelling-water-meter-readings-detail-card.component.html',
  styleUrls: ['./dwelling-water-meter-readings-detail-card.component.scss'],
})
export class DWellingWaterMeterReadingsComponent implements OnInit {

  @Input() public dwellingId: number;
  private chunk: number = 8;
  private waterMeterWithMeasurements: WaterMeterWithMeasurements;

  public datasource: BehaviorSubject<WaterMeterMeasurement[]>;
  public tableHeader: BehaviorSubject<Header[]> = new BehaviorSubject<Header[]>(
    [
      {
        columnDataName: 'measurement',
        columnName: 'Lecturas',
      },
      {
        columnDataName: 'date',
        columnName: 'Fecha',
      },
    ]
  );

  constructor(
    private readonly svcDwelling: DwellingService,
    private modalService: NgbModal
  ) {
    //
  }

  public ngOnInit(): void {
    this.svcDwelling.getCurrentWaterMeterMeasuresChunk(String(this.chunk), String(this.dwellingId)).subscribe(result => {
      this.waterMeterWithMeasurements = result;
      let measurements = this.waterMeterWithMeasurements.water_meter;
      this.datasource = new BehaviorSubject<WaterMeterMeasurement[]>(measurements);
    });
  }

  public addReading(): void {
    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.dwellingId)
      .subscribe((value) => {
        this.modalService.open(NewWaterFormComponent, {
          centered: true,
          backdrop: 'static',
        }).componentInstance.id = value.id;
      });
  }
}
