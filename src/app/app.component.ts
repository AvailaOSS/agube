import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { isUndefined, isNull } from 'lodash';
import { AccountService } from '@availa/auth-fe';
import { Router } from '@angular/router';

interface SelectedComponent {
  path: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularbootstrap';
  public menuComponents: SelectedComponent[] = [];
  public currentComponentName: string = 'Example';
  public user = undefined;

  constructor(private readonly accountService: AccountService,private readonly route: Router) {
    this.accountService.getUser().subscribe((result) => (this.user = result));
    this.menuComponents = [
      { path: 'viviendas', name: 'Viviendas' },
      { path: 'contact-book', name: 'Contactos' },
      { path: 'incidence', name: 'Incidencias' },
      { path: 'config', name: 'General' },
      { path: 'depositos', name: 'Depósito' },
      { path: 'subscription', name: 'Subscription' },
    ];
  }

  public selectedComponent(component: SelectedComponent): void {
    this.route.navigate([component.path])
    this.currentComponentName = component.name;

  }
}