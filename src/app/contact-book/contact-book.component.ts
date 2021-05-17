import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagerService } from '@availa/agube-rest-api';
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
  public userId: string;

  constructor(
    private readonly svcContactService: ContactService,
    private readonly svcManager: ManagerService,
    private readonly svcTagService: TagService,
    public dialog: MatDialog
  ) {
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
    });
    this.svcContactService.getContacts().subscribe((value) => {
      this.contactsTotal = value;
    });
    this.svcTagService.getAllTags().subscribe((value) => {
      console.log('tagService', value);
    });
  }

  public ngOnInit(): void {}
  public editDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      data: {
        dataKey: contact,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.svcContactService.getContacts().subscribe((value) => {
        this.contactsTotal = value;
      });
    });
  }
  public newDiaglog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.svcContactService.getContacts().subscribe((value) => {
        this.contactsTotal = value;
      });
    });
  }
}
