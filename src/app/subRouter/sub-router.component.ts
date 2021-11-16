import { Component, OnInit } from '@angular/core';
import { AccountService } from '@availa/auth-fe';
import { User } from '@availa/auth-fe/lib/login/models/user';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-sub-router',
  templateUrl: './sub-router.component.html',
})
export class SubRouterComponent implements OnInit {
  public title: string;
  public user: User;
  public toolbarName: string;

  constructor(private readonly accountService: AccountService) {
  }
  public ngOnInit(): void {
    this.accountService.getUser().subscribe((result) => {
      this.user = result;
    });
  }

  public getSelectedComponent(componentName: string): void {
    this.toolbarName = componentName;
  }
}
