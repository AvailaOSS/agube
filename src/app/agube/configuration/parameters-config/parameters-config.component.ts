import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ManagerService } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";

@Component({
  selector: "app-parameters-config",
  templateUrl: "./parameters-config.component.html",
  styleUrls: ["./parameters-config.component.scss"],
})
export class ParametersConfigComponent implements OnInit {
  public releaseDate: Date;
  public parametersForm: FormGroup;

  constructor(
    private readonly svcManager: ManagerService,
    private formBuilder: FormBuilder,
    private alertService: NotificationService
  ) {
    this.createForm();
  }

  private createForm() {
    this.parametersForm = this.formBuilder.group({
      max_daily_consumption: ["", Validators.required],
      hook_price: ["", Validators.required],
    });
  }

  public ngOnInit(): void {
    this.svcManager.getManagerConfiguration().subscribe((response) => {
      this.parametersForm
        .get("max_daily_consumption")
        .setValue(response.max_daily_consumption);
      this.parametersForm.get("hook_price").setValue(response.hook_price);
      this.releaseDate = new Date(response.release_date);
    });
  }

  public onSubmit(): void {
    const options = {
      autoClose: false,
      keepAfterRouteChange: false,
    };

    this.svcManager
      .updateManagerConfiguration(this.parametersForm.value)
      .subscribe(
        (response) => {
          this.releaseDate = new Date();
          this.alertService.success("Actualizado con éxito", options);
        },
        (error) => this.alertService.error("error", options)
      );
  }
}
