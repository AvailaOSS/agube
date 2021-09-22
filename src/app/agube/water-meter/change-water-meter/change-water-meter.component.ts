import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DwellingService } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";
import { AgubeRoute } from "src/app/agube/agube-route";
import { ChangeWaterMeterType } from "./change-water-meter-type.enum";
import { ChangeWaterMeterService } from "./change-water-meter.service";

@Component({
  selector: "app-change-water-meter",
  templateUrl: "./change-water-meter.component.html",
  styleUrls: ["./change-water-meter.component.scss"],
})
export class ChangeWaterMeterComponent implements OnInit {
  @Input() title?: string = "Cambio de Contador";
  // FIXME:  @Input() ChangeWaterMeterType
  public waterMeterForm: FormGroup;
  public id: number;

  constructor(
    private formBuilder: FormBuilder,
    private readonly activedRoute: ActivatedRoute,
    private readonly svcDwelling: DwellingService,
    private readonly svcChangeWaterMeter: ChangeWaterMeterService,
    private readonly svcNotification: NotificationService,
    private readonly router: Router
  ) {
    this.activedRoute.queryParams.subscribe((params) => {
      this.id = +params.data;
    });
    this.waterMeterForm = this.formBuilder.group({
      code: ["", Validators.required],
    });
  }

  public ngOnInit(): void {
    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.id)
      .subscribe((response) =>
        this.waterMeterForm.get("code").setValue(response.code)
      );
  }

  public onSubmit(): void {
    this.svcChangeWaterMeter
      .change(this.id, this.waterMeterForm.value, ChangeWaterMeterType.Dwelling)
      .subscribe(
        (value) => this.router.navigate([AgubeRoute.DWELLING]),
        (error) =>
          this.svcNotification.error(
            "Error al actualizar " + error.error.status
          )
      );
  }
}
