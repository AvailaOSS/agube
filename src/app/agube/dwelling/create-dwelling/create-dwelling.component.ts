import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DwellingService } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";
import { AgubeRoute } from "../../agube-route";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-dwelling",
  templateUrl: "./create-dwelling.component.html",
  styleUrls: ["./create-dwelling.component.scss"],
})
export class CreateDwellingComponent {
  title = "Alta vivienda";
  dwellingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    public readonly svcAlert: NotificationService,
    private readonly svcCreateNewDWelling: DwellingService
  ) {
    this.createForm();
  }

  private createForm() {
    this.dwellingForm = this.formBuilder.group({
      full_address: this.formBuilder.group({
        address: this.formBuilder.group({
          town: ["", Validators.required],
          street: ["", Validators.required],
          is_external: [false, Validators.required],
        }),
        number: ["", Validators.required],
        flat: [],
        gate: [],
      }),
      water_meter: this.formBuilder.group({
        code: ["", Validators.required],
      }),
    });
  }

  onSubmit() {
    this.svcCreateNewDWelling.createDwelling(this.dwellingForm.value).subscribe(
      () => {
        this.router.navigate([AgubeRoute.DWELLING]);
      },
      (err) => {
        this.svcAlert.error(JSON.stringify(err.error), {
          autoClose: false,
          keepAfterRouteChange: false,
        });
      }
    );
  }
}
