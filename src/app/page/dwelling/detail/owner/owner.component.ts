import { Component, OnInit } from '@angular/core';
import { UserService, DwellingService } from '@availa/agube-rest-api';
import { ResidentComponent } from '../resident/resident.component';

@Component({
  selector: 'app-owner',
  templateUrl: '../resident/resident.component.html',
  styleUrls: ['../info.component.scss'],
})
export class OwnerComponent extends ResidentComponent implements OnInit {
  override title = {
    title: 'GENERAL.TEXT.OWNER',
    icon: 'hail',
  };

  constructor(
    protected override svcUser: UserService,
    protected override svcDwelling: DwellingService
  ) {
    super(svcUser, svcDwelling);
  }

  override ngOnInit(): void {
    if (!this.dwellingId) {
      return;
    }
    this.svcDwelling
      .getCurrentOwner(this.dwellingId)
      .subscribe((responseOwner) => {
        if (!responseOwner.user.id) {
          return;
        }
        this.getUser(responseOwner.user.id);
      });
  }
}
