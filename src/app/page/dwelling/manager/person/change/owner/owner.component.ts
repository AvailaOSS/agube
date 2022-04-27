import { Component  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DwellingService, UserCreate } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { ChangeComponent } from '../change.component';

@Component({
  selector: 'app-change-owner',
  templateUrl: '../change.component.html',
  styleUrls: ['../change.component.scss'],
})
export class OwnerComponent extends ChangeComponent {
  constructor(
    router: Router,
    route: ActivatedRoute,
    formBuilder: FormBuilder,
    svcNotification: NotificationService,
    svcDwelling: DwellingService
  ) {
    super(router, route, formBuilder, svcNotification, svcDwelling);
    this.title = 'GENERAL.TEXT.OWNER';
  }

  override ngOnInit() {
    super.ngOnInit();
    this.loadCurrentOwner();
  }

  private onSave() {
    this.loadingPost = true;
    let user: UserCreate = {
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      phones: [{ phone_number: this.phone_number.value }],
      address: [
        this.dwelling!.address,
      ],
    };
    return this.svcDwelling.changeCurrentOwner(this.dwellingId,  {user})
  }

  override save() {
    super.save();
    this.onSave().subscribe({
      next: (response) => {
        this.resetForm();
        this.loadCurrentOwner();
        this.loadingPost = false;
      },
      error: (error) => {
        this.svcNotification.warning({ message: error });
        this.loadingPost = false;
      },
    });
  }

  override saveAndExit() {
    super.save();
    this.onSave().subscribe({
      next: (response) => {
        this.resetForm();
        this.loadingPost = false;
        this.exit();
      },
      error: (error) => {
        this.svcNotification.warning({ message: error });
        this.loadingPost = false;
      },
    });
  }

  private loadCurrentOwner(){
    this.svcDwelling.getCurrentOwner(this.dwellingId)
      .subscribe(response => this.currentPerson = response.user);
  }
}
