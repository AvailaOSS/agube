import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { WaterMeter } from '@availa/agube-rest-api';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterManager } from '../water-meter.manager';

@Component({
  selector: 'app-water-meter-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() public elementId: number | undefined;
  @Input() public type: number | undefined;
  @Output() public waterMeterId: EventEmitter<number> = new EventEmitter<
    number
  >();

  public waterMeter: WaterMeter | undefined;

  constructor(
    private readonly svcWaterMeterManager: WaterMeterManager,
    private svcPersistant: WaterMeterPersistantService
  ) {}

  ngOnInit(): void {
    this.svcPersistant.reload().subscribe((reload) => {
      if (reload) {
        this.loadWaterMeter();
      }
    });
  }

  ngOnChanges(): void {
    this.loadWaterMeter();
  }

  private loadWaterMeter() {
    if (!this.elementId) {
      return;
    }

    this.svcWaterMeterManager.get(this.elementId, this.type!).subscribe({
      next: (response: WaterMeter) => {
        this.waterMeter = response;
        this.waterMeterId.next(this.waterMeter!.id!);
        this.svcPersistant.emitCode(this.waterMeter.code);
      },
      error: (error) => (this.elementId = undefined),
    });
  }
}
