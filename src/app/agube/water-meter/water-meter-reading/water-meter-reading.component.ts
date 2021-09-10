import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WaterMeterService } from "@availa/agube-rest-api";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

@Component({
  selector: "app-water-meter-reading",
  templateUrl: "./water-meter-reading.component.html",
  styleUrls: ["./water-meter-reading.component.scss"],
})
export class WaterMeterReadingComponent implements OnInit {
  @Input() public id: any;
  public readingForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private svcWaterMeter: WaterMeterService
  ) {
    //
  }

  ngOnInit(): void {
    var now = moment();
    this.readingForm = this.formBuilder.group({
      date: [now.format("YYYY-MM-DD"), Validators.required],
      time: [now.format("HH:mm"), Validators.required],
      measurement: ["", Validators.required],
    });
  }

  public cancel(): void {
    this.activeModal.close();
  }

  public save(): void {
    const time = moment(this.readingForm.value.time, "HH:mm");
    this.svcWaterMeter
      .addWaterMeterMeasure(this.id, {
        measurement: this.readingForm.value.measurement,
        date: moment(this.readingForm.value.date)
          .add(time.hours(), "hours")
          .add(time.minutes(), "minutes")
          .toDate(),
      })
      .subscribe((response) => this.activeModal.close(response));
  }
}
