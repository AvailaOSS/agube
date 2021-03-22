import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  public users: any;
  constructor(private readonly route: Router) {}

  public ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
  }

  public goToSubscription(): void {
    this.route.navigate(['../subscription']);
  }
  public goToContactBook(): void {
    this.route.navigate(['../contact-book']);
  }
}
