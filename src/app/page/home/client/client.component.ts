import { SidebarComponent } from '../sidebar.component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-page-home-client',
    templateUrl: '../sidebar.component.html',
    styleUrls: ['../sidebar.component.scss'],
})
export class ClientComponent extends SidebarComponent {
    ngOnInit(): void {
        this.page = 'client/dwellings';
        this.pages = [
            {
                navigationRoute: 'client/config',
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_PROFILE',
                icon: 'person',
            },
            {
                navigationRoute: 'client/dwellings',
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_MY_DWELLING',
                icon: 'store',
            },
        ];
    }
}
