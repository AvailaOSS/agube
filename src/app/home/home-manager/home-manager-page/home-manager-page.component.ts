import { Component } from '@angular/core';
import { Contact } from '@availa/contact-book-rest-api';

@Component({
  selector: 'app-home-manager-page',
  templateUrl: './home-manager-page.component.html',
  styleUrls: ['./home-manager-page.component.scss'],
})
export class HomeManagerPageComponent {
  public contact: Contact | undefined;
  
  constructor() {}

  public selectedContact(event: Contact) {
    this.contact = event;
  }
}
