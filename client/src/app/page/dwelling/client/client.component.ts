import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService, UserDwellingDetail, UserService } from '@availaoss/agube-rest-api';
import { User } from '../../auth/login/models/user';
import { AccountService } from '../../auth/login/service/account.service';

@Component({
    selector: 'app-page-dwelling-client',
    styleUrls: ['./client.component.scss'],
    templateUrl: './client.component.html',
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
        private svcManger: ManagerService
    ) {
        this.dwellings = [];
        this.loading = true;
        this.dwellingPath = this.router.url + ClientComponent.UrlStringClient;
    }

    ngOnInit(): void {
        this.svcManger.userIsManager().subscribe({
            next: (response) => (this.userIsManager = response.is_manager),
            error: (error) => {
                if (error.status === 401) {
                    this.svcAccount.logout();
                }
            },
        });
        this.svcAccount.getUser().subscribe((user) => {
            this.user = user;

            if (!user) {
                return;
            }

            this.svcUser.getDwellingDetail(user!.user_id).subscribe({
                next: (response) => {
                    if (!response.length) {
                        this.loading = false;

                        return;
                    }
                    this.dwellings = response;
                },
                error: (error) => (this.loading = false),
            });
        });
    }

    public goToNewDwelling() {
        return this.router.navigate(['manager/home/dwellings/create']);
    }
}
