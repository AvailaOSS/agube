import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar.component';

@Component({
  selector: 'app-home-manager',
  templateUrl: '../sidebar.component.html',
  styleUrls: ['../sidebar.component.scss'],
})
export class HomeManagerComponent extends SidebarComponent {
  ngOnInit(): void {
    this.pages = [
      {
        navigationRoute: 'manager/client/config',
        title: 'Mi Perfil',
        icon: 'person',
      },
      {
        navigationRoute: 'manager/client/dwellings',
        title: 'Mi Vivienda',
        icon: 'store',
      },
      {
        navigationRoute: 'manager/dwellings',
        title: 'Viviendas',
        icon: 'holiday_village',
      },
      {
        navigationRoute: 'manager/reservoirs',
        title: 'Depósitos',
        icon: 'water_drop',
      },
      {
        navigationRoute: 'manager/config',
        title: 'Configuración',
        icon: 'settings',
      },
    ];
  }
}
