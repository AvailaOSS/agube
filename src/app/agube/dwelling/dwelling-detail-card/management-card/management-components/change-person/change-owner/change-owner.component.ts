import { Component } from "@angular/core";
import { AgubeRoute } from "src/app/agube/agube-route";
import { ChangePersonComponent } from "../change-person.component";

@Component({
  selector: "app-change-owner",
  templateUrl: "../change-person.component.html",
  styleUrls: ["../change-person.component.scss"],
})
export class ChangeOwnerComponent extends ChangePersonComponent {
  title = "Alta Propietario";

  public onSubmit(): void {
    this.svcCreateNewDWelling
      .changeCurrentOwner(this.dwellingId, {
        user: this.personForm.value,
      })
      .subscribe(
        () => this.router.navigate([AgubeRoute.DWELLING]),
        (err) =>
          this.svcAlert.error(JSON.stringify(err.error), {
            autoClose: false,
            keepAfterRouteChange: false,
          })
      );
  }
}
