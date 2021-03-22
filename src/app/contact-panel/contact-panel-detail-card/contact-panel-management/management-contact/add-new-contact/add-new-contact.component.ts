import { Component, OnInit } from '@angular/core';
import { ContactService } from 'apiaux/contact-book-rest-api-lib/src/public-api';


@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss'],
})
export class AddNewContactComponent implements OnInit {
  constructor(private readonly svcContactService: ContactService) {}

  public ngOnInit(): void {}

  public sendForm(event: any): void {
    console.log('add-contact', event);
    this.svcContactService.contactCreate({
      business_name: event.business_name,
      phone_number: event.phones,
      user: {
        username: event.username,
        first_name: 'test' ,
        last_name: 'test',
        email: 'user@example.com',
      },
    }).subscribe(value => {
      console.log(value)
    });
  }
}
