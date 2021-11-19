import { Component } from '@angular/core';
import { AgubeRoute } from 'src/app/agube-route';
import { ChangePersonComponent } from '../change-person.component';

@Component({
  selector: 'app-change-resident',
  templateUrl: '../change-person.component.html',
  styleUrls: ['../change-person.component.scss'],
})
export class ChangeResidentComponent extends ChangePersonComponent {
  title = 'Alta Residente';

  public onSubmit(): void {
    this.svcDWelling
      .changeCurrentResident(this.dwellingId, {
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
