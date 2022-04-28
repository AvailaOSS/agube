import { UserDetail, UserService } from '@availa/agube-rest-api';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@availa/auth-fe';
import { SidebarConfig } from './sidebar-config';
import { ThemeMode } from './theme-mode';

@Component({
  selector: 'app-sidebar',
  template: `<ng-template></ng-template>`,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public pages: SidebarConfig[] = [];
  public user: UserDetail | undefined;

  public toggleControl = new FormControl(false);

  private lightClassName: ThemeMode = ThemeMode.light;
  private darkClassName: ThemeMode = ThemeMode.dark;

  @HostBinding('class') className = this.lightClassName;

  constructor(
    protected router: Router,
    protected readonly accountService: AccountService,
    protected overlayContainer: OverlayContainer,
    private svcUser: UserService
  ) {
    //FIXME: add pipe with first name and last name
    this.accountService.getUser().subscribe((userResponse) => {
      if (!userResponse || !userResponse.user_id) {
        return;
      }
      this.svcUser
        .getUserDetailConfig(String(userResponse.user_id!))
        .subscribe((response) => {
          if (!response) {
            return;
          }

          if (response.mode === ThemeMode.light) {
            this.className = ThemeMode.light;
            this.overlayDialog(this.lightClassName, this.darkClassName);
          } else {
            this.className = ThemeMode.dark;
            this.overlayDialog(this.darkClassName, this.lightClassName);
          }
        });
      this.svcUser
        .getUserDetail(userResponse.user_id)
        .subscribe((response) => (this.user = response));
    });
  }

  public selectPage(select: SidebarConfig) {
    console.log(select);
    this.router.navigate([select.navigationRoute]);
  }

  public closeSession() {
    this.accountService.logout();
  }

  private overlayDialog(themeMode: ThemeMode, oldThemeMode: ThemeMode) {
    this.overlayContainer.getContainerElement().classList.remove(oldThemeMode);
    this.overlayContainer.getContainerElement().classList.add(themeMode);
  }
}
