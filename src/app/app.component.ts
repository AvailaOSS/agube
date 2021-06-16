import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { isUndefined, isNull } from 'lodash';
import { AccountService } from '@availa/auth-fe';
import { Router } from '@angular/router';
import { SubscriptionRoute } from '@availa/subscription-fe';
import { AgubeRoute } from './agube/agube-route';

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
  public toogleVision: boolean = false;
  constructor(
    private readonly accountService: AccountService,
    private readonly route: Router
  ) {
    this.accountService.getUser().subscribe((result) => {
      this.user = result;
      // if (this.user) {
      //   this.route.navigate([AgubeRoute.DWELLING]);
      // } else {
      //   this.route.navigate([SubscriptionRoute.SUBSCRIPTION]);
      // }
    });
    this.menuComponents = [
      { path: 'viviendas', name: 'Viviendas' },
      { path: 'contact-book', name: 'Contactos' },
      { path: 'contact-book', name: 'Agenda' },
      { path: 'wip', name: 'Lectura de Contador' },
      { path: 'incidence', name: 'Incidencias' },
      { path: 'wip', name: 'Facturas' },
      { path: 'wip', name: 'Correo' },
      { path: 'wip', name: 'Calendario' },
      { path: 'config', name: 'General' },
      { path: 'depositos', name: 'Depósito' },
      { path: 'subscription', name: 'Subscription' },
    ];
  }

  public selectedComponent(component: SelectedComponent): void {
    this.route.navigate([component.path]);
    this.currentComponentName = component.name;
  }
  public toogleSidebar(): void {
    console.log(this.toogleVision);
    this.toogleVision = !this.toogleVision;
  }
}
