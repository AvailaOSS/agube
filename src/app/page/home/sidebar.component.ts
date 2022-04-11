import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, AuthRoute } from '@availa/auth-fe';
import { User } from '@availa/auth-fe/lib/login/models/user';
import { SidebarConfig } from './sidebar-config';
import { ThemeMode } from './theme-mode';

@Component({
  selector: 'app-sidebar',
  template: `<ng-template></ng-template>`,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public pages: SidebarConfig[] = [];
  public user: User | undefined;

  public toggleControl = new FormControl(false);

  private lightClassName: ThemeMode = ThemeMode.light;
  private darkClassName: ThemeMode = ThemeMode.dark;

  @HostBinding('class') className = this.lightClassName;

  constructor(
    protected router: Router,
    protected readonly accountService: AccountService,
    protected overlayContainer: OverlayContainer
  ) {
    //FIXME: add pipe with first name and last name
    this.accountService.getUser().subscribe((response) => {
      this.user = response;
    });
    this.toggleControl.valueChanges.subscribe((isDarkMode) => {
      if (isDarkMode) {
        this.overlayDialog(this.darkClassName, this.lightClassName);
      } else {
        this.overlayDialog(this.lightClassName, this.darkClassName);
      }
    });
  }

  public selectPage(select: SidebarConfig) {
    this.router.navigate([select.navigationRoute]);
  }

  public closeSession() {
    this.accountService.logout();
    this.router.navigate([{ outlets: { primary: AuthRoute.LOGIN } }]);
  }

  private overlayDialog(themeMode: ThemeMode, oldThemeMode: ThemeMode) {
    this.className = themeMode;
    this.overlayContainer.getContainerElement().classList.remove(oldThemeMode);
    this.overlayContainer.getContainerElement().classList.add(themeMode);
  }
}
