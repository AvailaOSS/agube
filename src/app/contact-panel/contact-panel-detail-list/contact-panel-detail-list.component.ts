import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ContactPanel } from '../contact-panel.component';
import {
  Contact,
  ContactService,
} from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-panel-detail-list',
  templateUrl: './contact-panel-detail-list.component.html',
  styleUrls: ['./contact-panel-detail-list.component.scss'],
})
export class ContactPanelDetailListComponent implements OnInit {
  @Output() selected = new EventEmitter<Contact>();

  public selectedRowIndex = '';

  public displayedColumns: string[] = [
    'address',
    'water_meter',
    'resident_name',
    'phone',
  ];
  public dataSource: Contact[];

  constructor(
    private readonly contactService: ContactService,
    private svcRouter: Router
  ) {}

  public addNewContact(): void {
    this.svcRouter.navigate(['contactos/alta/contacto']);
  }

  public ngOnInit(): void {
    this.contactService.contactList().subscribe((value) => {
      this.dataSource = value;
    });
  }

  public selectRow(row: Contact): void {
    this.selected.emit(row);
    this.selectedRowIndex = row.business_name;
  }
}
