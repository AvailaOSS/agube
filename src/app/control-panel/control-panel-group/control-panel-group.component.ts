import { Component, Input, OnInit } from '@angular/core';
import { ControlPanelGroup } from './control-panel-group';

@Component({
  selector: 'app-control-panel-group',
  templateUrl: './control-panel-group.component.html',
  styleUrls: ['./control-panel-group.component.scss'],
})
export class ControlPanelGroupComponent implements OnInit {
  @Input() groupConfig: ControlPanelGroup;

  constructor() {}

  ngOnInit(): void {}
}
