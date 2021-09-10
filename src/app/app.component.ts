import { Component } from "@angular/core";
import { AccountService } from "@availa/auth-fe";
import { User } from "@availa/auth-fe/lib/login/models/user";
import { isNull, isUndefined } from "lodash";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title;
  hideContactBook;
  public user: User;
  public toolbarName: string;

  constructor(private readonly accountService: AccountService) {
    this.title = "";
    this.hideContactBook = true;
    this.toolbarName = environment.appName;
    // FIXME: accountService into ngOnInit ?
    this.accountService.getUser().subscribe((result) => {
      this.user = result;
      this.hideContactBook = isUndefined(this.user) || isNull(this.user);
    });
  }

  public getSelectedComponent(componentName: string) {
    this.toolbarName = componentName;
  }
}
