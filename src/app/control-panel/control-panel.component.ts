import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public users: any;

  constructor(private readonly route: Router) {}

  public ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
  }
}
