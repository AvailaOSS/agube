import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DwellingService, WaterMeter } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";
import { AgubeRoute } from "src/app/agube/agube-route";

@Component({
  selector: "app-change-water-meter",
  templateUrl: "./change-water-meter.component.html",
  styleUrls: ["./change-water-meter.component.scss"],
})
export class ChangeWaterMeterComponent implements OnInit {
  @Input() title?: string = "Cambio de Contador";
  public waterMeterForm: FormGroup;
  public id: number;

  constructor(
    private formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly svcChangeWaterMeter: DwellingService,
    private readonly alertService: NotificationService,
    private readonly router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = +params.data;
    });
    this.waterMeterForm = this.formBuilder.group({
      code: ["", Validators.required],
    });
  }

  public ngOnInit(): void {
    this.svcChangeWaterMeter
      .getCurrentDwellingWaterMeter(this.id)
      .subscribe((response) =>
        this.waterMeterForm.get("code").setValue(response.code)
      );
  }

  public onSubmit(): void {
    this.svcChangeWaterMeter
      .changeCurrentDwellingWaterMeter(this.id, this.waterMeterForm.value)
      .subscribe(
        (value) => this.router.navigate([AgubeRoute.DWELLING]),
        (error) =>
          this.alertService.error("Error al actualizar " + error.error.status)
      );
  }
}
