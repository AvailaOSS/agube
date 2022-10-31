import { DwellingResume, DwellingService } from '@availaoss/agube-rest-api';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/page/auth/login/service/account.service';

@Component({
    selector: 'app-info',
    styleUrls: ['./info.component.scss'],
    templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
    public dwellingResume: DwellingResume | undefined;

    constructor(private svcDwelling: DwellingService, private svcAccount: AccountService) {}

    ngOnInit(): void {
        this.svcDwelling.getResume().subscribe({
            next: (response) => (this.dwellingResume = response),
            error: (error) => {
                if (error.status === 401) {
                    this.svcAccount.logout();
                }
            },
        });
    }
}
