import { UserDetail, UserService } from '@availa/agube-rest-api';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@availa/auth-fe';
import { SidebarConfig } from './sidebar-config';
import { ThemeMode } from './theme-mode';
import { UserDetailConfigure } from '@availa/agube-rest-api/lib/model/userDetailConfigure';

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
      this.toggleControl.valueChanges.subscribe((isDarkMode) => {
        if (isDarkMode) {
          this.overlayDialog(this.darkClassName, this.lightClassName);
        } else {
          this.overlayDialog(this.lightClassName, this.darkClassName);
        }
      });
      this.svcUser
        .getUserDetailConfig(String(userResponse.user_id!))
        .subscribe((response) => {
          if (!response) {
            return;
          }
          this.setControlToggle(response);
        });
      this.svcUser
        .getUserDetail(userResponse.user_id)
        .subscribe((response) => (this.user = response));
    });
  }

  public selectPage(select: SidebarConfig) {
    this.router.navigate([select.navigationRoute]);
  }

  public closeSession() {
    this.accountService.logout();
  }

  private overlayDialog(themeMode: ThemeMode, oldThemeMode: ThemeMode) {
    this.className = themeMode;
    this.overlayContainer.getContainerElement().classList.remove(oldThemeMode);
    this.overlayContainer.getContainerElement().classList.add(themeMode);
  }
  private setControlToggle(response: UserDetailConfigure) {
    if (response.mode === this.lightClassName) {
      this.toggleControl.setValue(false);
      this.className = this.lightClassName;
    } else {
      this.toggleControl.setValue(true);
      this.className = this.darkClassName;
    }
  }
}
