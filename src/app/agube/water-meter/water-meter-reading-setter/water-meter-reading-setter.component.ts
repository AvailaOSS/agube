import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WaterMeterService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { formatISO, formatISO9075 } from 'date-fns';

@Component({
  selector: 'app-water-meter-reading-setter',
  templateUrl: './water-meter-reading-setter.component.html',
  styleUrls: ['./water-meter-reading-setter.component.scss'],
})
export class WaterMeterReadingSetterComponent implements OnInit {
  @Input() public id: any;
  @Input() public lastMeasure: any;
  public readingForm: FormGroup = new FormGroup({});
  public model = {
    date: formatISO(new Date(), { representation: 'date' }),
    time: formatISO9075(new Date(), { representation: 'time' }),
    measurement: 0,
  };

  public fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'time-validation', options: { errorPath: 'time' } },
          { name: 'date-validation', options: { errorPath: 'date' } },
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
            type: 'number',
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
    private svcWaterMeter: WaterMeterService,
    private readonly svcNotification: NotificationService
  ) {
    //
  }

  public ngOnInit(): void {
    this.model.measurement = this.lastMeasure;
  }

  public onSubmit(model: any): void {
    const options = {
      autoClose: true,
      keepAfterRouteChange: false,
    };

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
      .subscribe(
        (response) => {
          this.activeModal.close(response);
        },
        (error) => {
          this.svcNotification.error('Error ' + error.error.status, options);
        }
      );
  }

  public cancel(): void {
    this.activeModal.close();
  }
}
