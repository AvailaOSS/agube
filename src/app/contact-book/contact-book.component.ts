import { Component, OnInit } from '@angular/core';
import { ManagerService } from '@availa/agube-rest-api';
import {
  Contact,
  ContactService,
  TagService,
} from 'apiaux/contact-book-rest-api-lib/src/public-api';
@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.scss'],
})
export class ContactBookComponent implements OnInit {
  public contactsTotal: Contact[];
  public userId: string;

  constructor(
    private readonly svcContactService: ContactService,
    private readonly svcManager: ManagerService,
    private readonly svcTagService: TagService,
  ) {


  }

  public ngOnInit(): void {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
    });
  }


}
