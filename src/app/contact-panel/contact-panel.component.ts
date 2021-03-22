import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface ContactPanel {
  id: string;
  address: string;
  water_meter: string;
  resident_name: string;
  phone: string;
}

@Component({
  selector: 'app-contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss'],
})
export class ContactPanelComponent implements OnInit {
  public contactPanel: ContactPanel;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public selectItem(contactPanel: ContactPanel): void {
    this.contactPanel = contactPanel;
  }

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
}
