import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ManagerService } from "@availa/agube-rest-api";
import { NotificationService } from "@availa/notification";

@Component({
  selector: "app-parameters-config",
  templateUrl: "./parameters-config.component.html",
  styleUrls: ["./parameters-config.component.scss"],
})
export class ParametersConfigComponent implements OnInit {
  public parametersForm: FormGroup;
  public userId: string;
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    private readonly svcManager: ManagerService,
    private formBuilder: FormBuilder,
    private alertService: NotificationService
  ) {
    //
  }

  public ngOnInit(): void {
    this.parametersForm = this.formBuilder.group({
      hook_price: new FormControl(),
      release_date: new FormControl(),
      max_daily_consumption: new FormControl(),
    });
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.svcManager
        .getManagerConfiguration(value.user_id)
        .subscribe((values) => {
          this.parametersForm
            .get("hook_price")
            .setValue(values.hook_price.hook_price);
          this.parametersForm
            .get("release_date")
            .setValue(values.hook_price.release_date.split("T")[0]);
          this.parametersForm
            .get("max_daily_consumption")
            .setValue(values.max_daily_consumption);
        });
    });
  }

  public onSubmit(): void {
    this.svcManager
      .updateManagerConfiguration(this.userId, {
        max_daily_consumption: this.parametersForm.value.max_daily_consumption,
        hook_price: {
          hook_price: this.parametersForm.value.hook_price,
        },
      })
      .subscribe(
        (value) => {
          this.alertService.success("Actualizado con éxito", this.options);
        },
        (error) => {
          this.alertService.error("error", this.options);
        }
      );
  }
}
