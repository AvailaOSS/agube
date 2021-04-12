import { Component } from '@angular/core';
import { AccountService } from './login/service/account.service';
import { isNull } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'agube-fe';
  public loginPage: boolean;
  constructor(private readonly svcAccountService: AccountService) {
    this.svcAccountService.getUser().subscribe((value) => {
      if (!isNull(value)) {
        this.loginPage = false;
      } else {
        this.loginPage = true;
      }
    });
  }
}
