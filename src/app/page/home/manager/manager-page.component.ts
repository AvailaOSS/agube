import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar.component';

@Component({
    selector: 'app-page-home-manager',
    templateUrl: '../sidebar.component.html',
    styleUrls: ['../sidebar.component.scss'],
})
export class ManagerPageComponent extends SidebarComponent {
    public override home: string = 'manager/home/dwellings';
    public override profile: string='manager/home/client/config';
    ngOnInit(): void {
        this.pages = [
            {
                navigationRoute: this.profile,
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_PROFILE',
                icon: 'person',
            },
            {
                navigationRoute: 'manager/home/manager/client/dwellings',
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_MY_DWELLING',
                icon: 'store',

            },
            {
                navigationRoute: this.home,
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_DWELLINGS',
                icon: 'holiday_village'
            },
            {
                navigationRoute: 'manager/home/reservoirs',
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_RESERVOIRS',
                icon: 'water_drop',
            },
            {
                navigationRoute: 'manager/home/person/residents',
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_RESIDENT',
                icon: 'escalator_warning',
            },
            {
                navigationRoute: 'manager/home/person/owners',
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_OWNERS',
                icon: 'hail',
            },
            {
                navigationRoute: 'manager/home/config',
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_CONFIGURATION',
                icon: 'settings',
            },
        ];
    }
}
