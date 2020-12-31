import { SubscriptionService } from 'agube-rest-api-lib';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  title = 'subscription';
  constructor(
    private lib: SubscriptionService,
    private readonly router: Router
  ) {}

  links = [
    {
      name: 'Login',
      url: 'login',
    },
    {
      name: 'Principal',
      url: 'principal',
    },
    {
      name: 'Suscripción',
      url: 'subscription',
    },
    {
      name: 'Agenda',
      url: 'contact-book',
    },
  ];

  ngOnInit(): void {}
}
