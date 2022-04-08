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
        title: 'SIDEBAR.TITLES.PAGE_PROFILE',
        icon: 'person',
      },
      {
        navigationRoute: 'manager/client/dwellings',
        title: 'SIDEBAR.TITLES.PAGE_MY_DWELLING',
        icon: 'store',
      },
      {
        navigationRoute: 'manager/dwellings',
        title: 'SIDEBAR.TITLES.PAGE_DWELLINGS',
        icon: 'holiday_village',
      },
      {
        navigationRoute: 'manager/reservoirs',
        title: 'SIDEBAR.TITLES.PAGE_RESERVOIRS',
        icon: 'water_drop',
      },
      {
        navigationRoute: 'manager/config',
        title: 'SIDEBAR.TITLES.PAGE_CONFIGURATION',
        icon: 'settings',
      },
    ];
  }
}
