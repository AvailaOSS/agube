import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ManagerService } from "@availa/agube-rest-api";
import { AgubeRoute } from "../agube-route";
import { NotificationService } from "@availa/notification";
import { UserService } from "@availa/auth-rest-api";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.scss"],
})
export class ConfigurationComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public userId: string;
  public registerForm: FormGroup;
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(
    private readonly svcManager: ManagerService,
    private formBuilder: FormBuilder,
    private alertService: NotificationService,
    private svcAuthService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      hook_price: new FormControl(),
      release_date: new FormControl(),
      max_daily_consumption: new FormControl(),
      password: new FormControl(),
      password2: new FormControl(),
    });
  }

  public ngOnInit(): void {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
      this.svcManager
        .getManagerConfiguration(this.userId)
        .subscribe((values) => {
          this.registerForm
            .get("hook_price")
            .setValue(values.hook_price.hook_price);
          this.registerForm
            .get("release_date")
            .setValue(values.hook_price.release_date.split("T")[0]);
          this.registerForm
            .get("max_daily_consumption")
            .setValue(values.max_daily_consumption);
        });
    });
  }

  public onSubmit(): void {
    this.svcManager
      .updateManagerConfiguration(this.userId, {
        max_daily_consumption: this.registerForm.value.max_daily_consumption,
        hook_price: {
          hook_price: this.registerForm.value.hook_price,
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
  public onSubmitPassword(): void {
    this.svcAuthService
      .changePassword({
        // FIXME: username instead of userId
        username: this.userId,
        password: this.registerForm.value.password,
        confirm_password: this.registerForm.value.password2,
      })
      .subscribe(
        (values) => {
          this.alertService.success("Actualizado con éxito", this.options);
        },
        (error) => {
          this.alertService.error(
            "Error al actualizar " + error.error.status,
            this.options
          );
        }
      );
  }
}
