import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WaterMeterService } from '@availa/agube-rest-api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { formatISO, formatISO9075 } from 'date-fns';
import * as moment from 'moment';
@Component({
  selector: 'app-water-meter-reading-setter',
  templateUrl: './water-meter-reading-setter.component.html',
  styleUrls: ['./water-meter-reading-setter.component.scss'],
})
export class WaterMeterReadingSetterComponent implements OnInit {
  @Input() public id: any;
  public readingForm: FormGroup = new FormGroup({});
  model = {
    date: formatISO(new Date(), { representation: 'date' }),
    time: formatISO9075(new Date(), { representation: 'time' }),
    measures: 1,
  };
  public fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'date' } },
          { name: 'fieldMatch', options: { errorPath: 'time' } },
        ],
      },
      fieldGroup: [
        {
          key: 'date',
          type: 'input',
          templateOptions: {
            type: 'date',
            label: 'Fecha',
            required: true,
          },
        },
        {
          key: 'time',
          type: 'input',
          templateOptions: {
            type: 'time',
            label: 'Hora',
            required: true,
          },
        },
        {
          key: 'measurement',
          type: 'input',
          templateOptions: {
            type: 'input',
            label: 'Lectura',
            placeholder: 'Lectura',
            required: true,
          },
        },
      ],
    },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private svcWaterMeter: WaterMeterService
  ) {
    //
  }

  public onSubmit(model: any): void {
    const dateModel = new Date(
      model.date.split('-')[0],
      model.date.split('-')[1] - 1,
      model.date.split('-')[2],
      model.time.split(':')[0],
      model.time.split(':')[1]
    );
    this.svcWaterMeter
      .addWaterMeterMeasure(this.id, {
        measurement: model.measurement,
        date: dateModel,
      })
      .subscribe((response) => this.activeModal.close(response));
  }

  public ngOnInit(): void {}

  public cancel(): void {
    this.activeModal.close();
  }
}
