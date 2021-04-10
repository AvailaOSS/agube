import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Contact,
  ContactService,
  TagService,
} from 'apiaux/contact-book-rest-api-lib/src/public-api';

import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.scss'],
})
export class ContactBookComponent implements OnInit {
  public contactsTotal: Contact[];
  constructor(
    private readonly svcContactService: ContactService,
    private readonly svcTagService: TagService,
    public dialog: MatDialog
  ) {
    this.svcContactService.contactList().subscribe((value) => {
      this.contactsTotal = value;
    });
    this.svcTagService.tagList().subscribe((value) => {
      console.log('tagService', value);
    });
  }

  public ngOnInit(): void {}
  public editDialog(Contact: Contact): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      data: {
        dataKey: Contact,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.svcContactService.contactList().subscribe((value) => {
        this.contactsTotal = value;
      });
    });
  }
  public newDiaglog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.svcContactService.contactList().subscribe((value) => {
        this.contactsTotal = value;
      });
    });
  }
}
