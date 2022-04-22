import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UserDwellingDetail,
  UserService,
  ManagerService,
} from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { User } from '@availa/auth-fe/lib/login/models/user';

@Component({
  selector: 'app-page-dwelling-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public dwellings: UserDwellingDetail[];
  public user: User | undefined;
  public loading: boolean = false;

  // private static UrlStringManager: string =
  //   './manager/home/client/dwellings/detail';
  private static UrlStringClient: string = './client/dwellings/detail';

  constructor(
    private router: Router,
    private svcAccount: AccountService,
    private svcUser: UserService,
    private svcManager: ManagerService
  ) {
    this.dwellings = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.svcAccount.getUser().subscribe((user) => {
      this.user = user;
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

  public goToDwellingDetail(dwelling: UserDwellingDetail) {
      this.routeString(ClientComponent.UrlStringClient, dwelling);
  }
  private routeString(name: string, dwelling: UserDwellingDetail) {
    return this.router.navigate([name], {
      queryParams: { dwellingId: dwelling.id },
    });
  }
}
