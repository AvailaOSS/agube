import { Component } from '@angular/core';
import { AccountService } from '@availa/auth-fe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularbootstrap';

  // FIXME : REMOVE ANY
  public user: any;
  public toolbarName: string;
  constructor(private readonly accountService: AccountService) {
    this.accountService.getUser().subscribe((result) => {
      this.user = result;
    });
  }

  public getSelectedComponent(componentName: string) {
    this.toolbarName = componentName;
  }
}
