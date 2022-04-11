import { Component } from '@angular/core';
import { Contact } from '@availa/contact-book-rest-api';

@Component({
  selector: 'app-home-manager-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  public contact: Contact | undefined;

  constructor() {}

  public selectedContact(event: Contact) {
    this.contact = event;
  }
}
