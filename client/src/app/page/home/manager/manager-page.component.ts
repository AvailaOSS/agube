import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar.component';

@Component({
    selector: 'app-page-home-manager',
    styleUrls: ['../sidebar.component.scss'],
    templateUrl: '../sidebar.component.html',
})
export class ManagerPageComponent extends SidebarComponent {
    public override home: string = 'manager/home/dwellings';
    public override profile: string = 'manager/home/client/config';

    public ngOnInit(): void {
        this.pages = [
            {
                navigationRoute: this.profile,
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_PROFILE',
                icon: 'person',
            },
            // {
            //     navigationRoute: 'manager/home/manager/client/dwellings',
            //     title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_MY_DWELLING',
            //     icon: 'store',

            // },
            {
                navigationRoute: this.home,
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_DWELLINGS',
                icon: 'house',
            },
            {
                navigationRoute: 'manager/home/reservoirs',
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_RESERVOIRS',
                icon: 'reservoir',
            },
            {
                navigationRoute: 'manager/home/springsources',
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_WATER_SOURCES',
                icon: 'spring_source',
            },
            {
                navigationRoute: 'manager/home/person/residents',
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_RESIDENT',
                icon: 'resident',
            },
            // {
            //     navigationRoute: 'manager/home/person/owners',
            //     title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_OWNERS',
            //     icon: 'hail',
            // },
            {
                navigationRoute: 'manager/home/config',
                title: 'PAGE.HOME.SIDEBAR.MANAGER.ROUTE.PAGE_CONFIGURATION',
                icon: 'settings',
            },
        ];
    }
}
