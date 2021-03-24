import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public users: any;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.users = JSON.parse(localStorage.getItem('currentUser'));
  }

  public goTo(route) {
    this.router.navigate([route]);
  }
}
