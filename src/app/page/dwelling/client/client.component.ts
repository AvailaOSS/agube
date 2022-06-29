import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService, UserDwellingDetail, UserService } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { User } from '@availa/auth-fe/lib/login/models/user';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
    selector: 'app-page-dwelling-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
    public dwellings: UserDwellingDetail[];
    public user: User | undefined;
    public loading: boolean = false;
    public userIsManager: boolean = false;

    public dwellingPath: string = '';

    private static UrlStringClient: string = '/detail';

    constructor(
        private router: Router,
        private svcAccount: AccountService,
        private svcUser: UserService,
        private svcManger: ManagerService,
        private googleAnalyticsService: GoogleAnalyticsService
    ) {
        this.dwellings = [];
        this.loading = true;
        this.dwellingPath = this.router.url + ClientComponent.UrlStringClient;

        this.googleAnalyticsService.pageView('/client_view', 'client_view');
    }

    ngOnInit(): void {
        this.svcManger.userIsManager().subscribe((response) => (this.userIsManager = response.is_manager));
        this.svcAccount.getUser().subscribe((user) => {
            this.user = user;

            if (!user) {
                return;
            }

            this.svcUser.getDwellingDetail(user!.user_id).subscribe({
                next: (response) => {
                    if (!response.length) {
                        this.loading = false;
                        this.googleAnalyticsService.event(
                            'dwelling_action_client',
                            'dwelling_category_client',
                            'dwelling_label_client',
                            0,
                            true
                        );
                        return;
                    }
                    this.dwellings = response;
                },
                error: (error) => (this.loading = false),
            });
        });
    }

    public goToNewDwelling() {
        this.googleAnalyticsService.event(
            'dwelling_action_client_new_dwelling',
            'dwelling_category_client_new_dwelling',
            'dwelling_label_client_new_dwelling',
            0,
            true
            );
            return this.router.navigate(['manager/home/dwellings/create']);
    }
}
