import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChildren,
  ElementRef,
  QueryList,
  Input,
} from '@angular/core';
import {
  DwellingService,
  WaterMeterWithMeasurements,
} from '@availa/agube-rest-api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AgubeRoute } from '../../agube-route';
import { ReservoirService } from '@availa/agube-rest-api';

@Component({
  selector: 'app-water-meter-historical',
  templateUrl: './water-meter-historical.component.html',
  styleUrls: ['./water-meter-historical.component.scss'],
})
export class WaterMeterHistoricalComponent implements OnInit {
  public getHistorical: any;
  @Input() private id: number;
  constructor(
    private dwellingService: DwellingService,
    private reservoirService: ReservoirService,
    public activeModal: NgbActiveModal,
    public route: Router
  ) {}

  public ngOnInit(): void {
    console.log(this.route.url);
    if (
      this.route.url ===
      '/' + AgubeRoute.DWELLING + '(contactPopup:contact)'
    ) {
      this.dwellingService
        .getCurrentDwellingWaterMeterHistorical(this.id)
        .subscribe((value) => {
          this.getHistorical = value;
        });
    } else {
      this.reservoirService
        .getCurrentReservoirWaterMeterHistorical(this.id)
        .subscribe((value) => {
          this.getHistorical = value;
        });
    }
  }
  public cancel(): void {
    this.activeModal.close();
  }
}
