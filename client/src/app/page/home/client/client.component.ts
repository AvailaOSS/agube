import { SidebarComponent } from '../sidebar.component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-page-home-client',
    styleUrls: ['../sidebar.component.scss'],
    templateUrl: '../sidebar.component.html',
})
export class ClientComponent extends SidebarComponent {
    public override home: string = 'client/dwellings';
    public override profile: string = 'client/config';
    public ngOnInit(): void {
        this.pages = [
            {
                icon: 'person',
                navigationRoute: this.profile,
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_PROFILE',
            },
            {
                icon: 'store',
                navigationRoute: this.home,
                title: 'PAGE.HOME.SIDEBAR.CLIENT.ROUTE.PAGE_MY_DWELLING',
            },
        ];
    }
}
