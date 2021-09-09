import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { NotificationService } from "@availa/notification";
import { UserService } from "@availa/auth-rest-api";

@Component({
  selector: "app-password-config",
  templateUrl: "./password-config.component.html",
  styleUrls: ["./password-config.component.scss"],
})
export class PasswordConfigComponent implements OnInit {
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  public passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: NotificationService,
    private svcAuthService: UserService
  ) {
    //
  }

  public ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      username: new FormControl(),
      password: new FormControl(),
      confirm_password: new FormControl(),
    });
  }

  public onSubmit(): void {
    this.svcAuthService.changePassword(this.passwordForm.value).subscribe(
      (values) =>
        this.alertService.success("Actualizado con éxito", this.options),
      (error) =>
        this.alertService.error(
          "Error al actualizar " + error.error.status,
          this.options
        )
    );
  }
}
