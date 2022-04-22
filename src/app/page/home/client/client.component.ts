import { SidebarComponent } from '../sidebar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-home-client',
  templateUrl: '../sidebar.component.html',
  styleUrls: ['../sidebar.component.scss'],
})
export class ClientComponent extends SidebarComponent {
  ngOnInit(): void {
    this.pages = [
      {
        navigationRoute: 'client/config',
        title: 'Mi Perfil',
        icon: 'person',
      },
      {
        navigationRoute: 'client/dwellings',
        title: 'Mi Vivienda',
        icon: 'store',
      },
    ];
  }
}
