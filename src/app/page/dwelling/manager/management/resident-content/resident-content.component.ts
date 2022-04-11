import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Resident, DwellingService } from '@availa/agube-rest-api';

@Component({
  selector: 'app-resident-content',
  templateUrl: './resident-content.component.html',
  styleUrls: ['./resident-content.component.scss'],
})
export class ResidentContentComponent implements OnChanges {
  public resident: Resident | undefined = undefined;

  @Input() public dwellingId: number | undefined;

  constructor(private svcDwelling: DwellingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.dwellingId) {
      return;
    }

    this.svcDwelling.getCurrentResident(this.dwellingId).subscribe({
      next: (response) => {
        this.resident = response;
      },
      error: () => {
        this.resident = undefined;
      },
    });
  }

  getMainPhone() {
    // FIXME: get main phone from api rest
    return this.resident!.user.phones[0].phone_number;
  }
}
