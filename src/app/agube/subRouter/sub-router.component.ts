import { Component, OnInit } from '@angular/core';
import { AccountService } from '@availa/auth-fe';
import { User } from '@availa/auth-fe/lib/login/models/user';
import { isNull, isUndefined } from 'lodash';

@Component({
  selector: 'app-sub-router',
  templateUrl: './sub-router.component.html',
})
export class SubRouterComponent implements OnInit {
  public hideContactBook: boolean;
  public user: User;
  constructor(private readonly accountService: AccountService) {}

  public ngOnInit(): void {
    this.accountService.getUser().subscribe((result) => {
      this.user = result;
      this.hideContactBook = isUndefined(this.user) || isNull(this.user);
    });
  }
}
