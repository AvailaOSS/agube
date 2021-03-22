import { Component, Input, OnInit } from '@angular/core';
import { ContactPanel } from '../contact-panel.component';

@Component({
  selector: 'app-contact-panel-detail-card',
  templateUrl: './contact-panel-detail-card.component.html',
  styleUrls: ['./contact-panel-detail-card.component.scss'],
})
export class ContactPanelDetailCardComponent implements OnInit {
  @Input() ContactPanel: ContactPanel | undefined;

  constructor() {}

  ngOnInit(): void {}
}
